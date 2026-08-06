import { ArcanoPessoalDB } from '../data/arcanos';

export const getArcanoDetalhado = (numero: number) => {
    return ArcanoPessoalDB.getByNumero(numero);
};

export const getPrevisao2026 = (numero: number) => {
    return ArcanoPessoalDB.getPrevisao2026(numero);
};

export const calcularAnoPessoal = (dataNascimento: string | undefined): number => {
    if (!dataNascimento) return 0; // Default Louco

    // Formato esperado: YYYY-MM-DD (input type="date" padrão)
    // Se vier DD/MM/YYYY, tentar tratar
    let dia = 0;
    let mes = 0;

    if (dataNascimento.includes('-')) {
        const parts = dataNascimento.split('-');
        dia = parseInt(parts[2], 10);
        mes = parseInt(parts[1], 10);
    } else if (dataNascimento.includes('/')) {
        const parts = dataNascimento.split('/');
        dia = parseInt(parts[0], 10);
        mes = parseInt(parts[1], 10);
    } else {
        return 0;
    }

    if (isNaN(dia) || isNaN(mes)) return 0;

    const anoAlvo = new Date().getFullYear();

    // Soma direta: Dia + Mes + Ano
    let soma = dia + mes + anoAlvo;

    // Redução recursiva até <= 22
    while (soma > 22) {
        soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }

    return soma;
};
