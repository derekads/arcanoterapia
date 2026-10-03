// src/components/orb/LiquidOrb.tsx

import React, { useEffect, useRef, useState } from 'react';
import { LIQUID_ORB_WGSL } from './liquidOrbShader';
import {
    SEEDS, ORB_UNIFORM_COUNT, PRIMEIRA_COR,
    ATIVACAO_MS, ACOMODACAO_MS, type EstadoOrbe,
} from './liquidOrbSeeds';

interface Props {
    /** Lado do orbe em pixels de CSS. O canvas é sempre quadrado. */
    tamanho?: number;
    estado?: EstadoOrbe;
    className?: string;
    /**
     * Chamado uma vez quando o orbe não pode rodar — sem WebGPU, sem adaptador,
     * shader recusado, dispositivo perdido. Quem usa DEVE tratar: metade dos
     * celulares do público não tem WebGPU, e é neles que a tela de espera
     * aparece.
     */
    aoFalhar?: (motivo: string) => void;
}

const srgbParaLinear = (v: number) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;

const linearParaSrgb = (v: number) =>
    v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;

/** Cores interpolam em espaço linear; do contrário a transição escurece no meio. */
const misturarSrgb = (de: number, para: number, t: number) =>
    linearParaSrgb(srgbParaLinear(de) + (srgbParaLinear(para) - srgbParaLinear(de)) * t);

/**
 * ORBE LÍQUIDO — WebGPU
 *
 * Renderiza o orbe de vidro em um canvas quadrado. Não decide nada sobre o
 * layout da tela onde aparece: quem usa posiciona.
 *
 * Falha para fora, nunca para dentro. Qualquer problema chama `aoFalhar` e o
 * componente para de desenhar — quem usa mostra a animação de reserva. Isso
 * importa porque WebGPU ainda não existe em boa parte dos navegadores móveis
 * brasileiros, e a tela de carregamento é obrigatória no fluxo do app: se ela
 * ficasse em branco, o usuário não teria como avançar.
 */
export const LiquidOrb: React.FC<Props> = ({
    tamanho = 200,
    estado = 'thinking',
    className,
    aoFalhar,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const estadoRef = useRef<EstadoOrbe>(estado);
    const trocarRef = useRef<((e: EstadoOrbe) => void) | null>(null);
    const aoFalharRef = useRef(aoFalhar);
    const [morto, setMorto] = useState(false);

    useEffect(() => { aoFalharRef.current = aoFalhar; }, [aoFalhar]);

    // Trocar de estado depois de montado (idle ⇄ thinking) sem recriar o device.
    useEffect(() => {
        estadoRef.current = estado;
        trocarRef.current?.(estado);
    }, [estado]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let vivo = true;
        let frameId = 0;
        let device: GPUDevice | null = null;

        const desistir = (motivo: string) => {
            if (!vivo) return;
            vivo = false;
            cancelAnimationFrame(frameId);
            try { device?.destroy(); } catch { /* já destruído */ }
            device = null;
            setMorto(true);
            aoFalharRef.current?.(motivo);
        };

        const gpu = (navigator as any).gpu as GPU | undefined;
        if (!gpu) {
            desistir('WebGPU indisponível neste navegador');
            return;
        }

        // Estado da transição entre os dois conjuntos de uniforms.
        let de = new Float32Array(SEEDS[estadoRef.current]);
        let para = new Float32Array(SEEDS[estadoRef.current]);
        const exibido = new Float32Array(SEEDS[estadoRef.current]);
        let alvo: EstadoOrbe = estadoRef.current;
        let atual: EstadoOrbe = estadoRef.current;
        let inicioTransicao = 0;
        let duracaoTransicao = 0;

        const progresso = (agora: number) => {
            if (duracaoTransicao === 0) return 1;
            const bruto = Math.min(1, Math.max(0, (agora - inicioTransicao) / duracaoTransicao));
            return alvo === 'thinking' ? 1 - (1 - bruto) ** 3 : bruto * bruto * (3 - 2 * bruto);
        };

        const amostrar = (agora: number) => {
            const t = progresso(agora);
            for (let i = 3; i < exibido.length; i += 1) {
                const ehCor = i >= PRIMEIRA_COR && (i - PRIMEIRA_COR) % 4 < 3;
                exibido[i] = ehCor
                    ? misturarSrgb(de[i], para[i], t)
                    : de[i] + (para[i] - de[i]) * t;
            }
            return exibido;
        };

        trocarRef.current = (proximo) => {
            if (proximo === atual || !SEEDS[proximo]) return;
            const agora = performance.now();
            amostrar(agora);
            de = new Float32Array(exibido);
            para = new Float32Array(SEEDS[proximo]);
            alvo = proximo;
            inicioTransicao = agora;
            duracaoTransicao = proximo === 'thinking' ? ATIVACAO_MS : ACOMODACAO_MS;
            atual = proximo;
        };

        (async () => {
            try {
                const adapter = await gpu.requestAdapter();
                if (!adapter) return desistir('nenhum adaptador WebGPU compatível');
                if (!vivo) return;

                const dev = await adapter.requestDevice();
                if (!vivo) { dev.destroy(); return; }
                device = dev;

                const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
                if (!context) return desistir('canvas sem contexto WebGPU');

                const format = gpu.getPreferredCanvasFormat();
                context.configure({ device: dev, format, alphaMode: 'premultiplied' });

                const shader = dev.createShaderModule({ code: LIQUID_ORB_WGSL });
                const info = await shader.getCompilationInfo();
                if (!vivo) return;
                const erros = info.messages.filter(m => m.type === 'error');
                if (erros.length) {
                    return desistir(erros.map(m => `${m.lineNum}:${m.linePos} ${m.message}`).join('\n'));
                }

                // Só o pipeline principal. Os pontos de entrada `ribbon_*` do
                // shader servem ao estilo 24, que exige um segundo alvo de
                // renderização e 221 mil instâncias; o app roda no estilo 21.
                const pipeline = dev.createRenderPipeline({
                    layout: 'auto',
                    vertex: { module: shader, entryPoint: 'vs_main' },
                    fragment: {
                        module: shader,
                        entryPoint: 'fs_main',
                        targets: [{
                            format,
                            blend: {
                                color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                                alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                            },
                        }],
                    },
                    primitive: { topology: 'triangle-list' },
                });

                const valores = new Float32Array(ORB_UNIFORM_COUNT);
                valores.set(exibido);
                const uniformBuffer = dev.createBuffer({
                    size: valores.byteLength,
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                });
                const bindGroup = dev.createBindGroup({
                    layout: pipeline.getBindGroupLayout(0),
                    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
                });

                dev.lost.then(info => {
                    // `destroy()` também resolve esta promessa. Só é falha real
                    // se ainda estivermos desenhando.
                    if (vivo) desistir(`dispositivo WebGPU perdido: ${info.message || info.reason}`);
                });
                dev.addEventListener?.('uncapturederror', (e: any) => {
                    e.preventDefault?.();
                    desistir(`erro de renderização: ${e.error?.message ?? e.error}`);
                });

                let ultimoQuadro: number | null = null;
                let fase = 0;

                const quadro = (agora: number) => {
                    if (!vivo || !device) return;
                    try {
                        const dpr = Math.min(window.devicePixelRatio || 1, 2);
                        const lado = Math.max(1, Math.floor((canvas.clientWidth || tamanho) * dpr));
                        if (canvas.width !== lado || canvas.height !== lado) {
                            canvas.width = lado;
                            canvas.height = lado;
                        }

                        valores.set(amostrar(agora));

                        // O tempo avança em fase acumulada, não em `agora * speed`:
                        // assim mudar a velocidade no meio da transição não faz o
                        // padrão saltar.
                        const dt = ultimoQuadro === null
                            ? 0
                            : Math.min(0.1, Math.max(0, (agora - ultimoQuadro) / 1000));
                        ultimoQuadro = agora;
                        fase += dt * Math.max(valores[3], 0);

                        valores[0] = lado;
                        valores[1] = lado;
                        valores[2] = fase / Math.max(valores[3], 0.001);
                        device.queue.writeBuffer(uniformBuffer, 0, valores);

                        const encoder = device.createCommandEncoder();
                        const pass = encoder.beginRenderPass({
                            colorAttachments: [{
                                view: context.getCurrentTexture().createView(),
                                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                                loadOp: 'clear',
                                storeOp: 'store',
                            }],
                        });
                        pass.setPipeline(pipeline);
                        pass.setBindGroup(0, bindGroup);
                        pass.draw(3);
                        pass.end();
                        device.queue.submit([encoder.finish()]);
                        frameId = requestAnimationFrame(quadro);
                    } catch (e) {
                        desistir(e instanceof Error ? e.message : String(e));
                    }
                };

                frameId = requestAnimationFrame(quadro);
            } catch (e) {
                desistir(e instanceof Error ? e.message : String(e));
            }
        })();

        return () => {
            vivo = false;
            trocarRef.current = null;
            cancelAnimationFrame(frameId);
            try { device?.destroy(); } catch { /* já destruído */ }
        };
        // Sem dependências: o device é criado uma vez. O tamanho é lido a cada
        // quadro e o estado entra pela ref, então nada aqui precisa remontar.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (morto) return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-orbe="liquido"
            className={className}
            style={{ width: tamanho, height: tamanho, display: 'block' }}
        />
    );
};

export default LiquidOrb;
