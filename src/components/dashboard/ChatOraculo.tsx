import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  /**
   * O arcano inteiro. O componente lê sombras, conselhos, elemento e
   * palavras-chave daqui — antes recebia só `personaAI`, que não carrega
   * nenhum desses campos, e as respostas saíam com "undefined" no texto.
   */
  arcano: ArcanoAdvanced;
  arcanaName: string;
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

export const ChatOraculo: React.FC<Props> = ({ arcano, arcanaName }) => {
  const persona = arcano.personaAI;

  // Conteúdo real do arcano, com as várias grafias que a base usa.
  const sombras = arcano.conteudo?.sombra ?? arcano.insights?.sombra ?? [];
  const conselhos = arcano.conteudo?.conselho ?? arcano.insights?.conselho ?? arcano.conselho_diario ?? [];
  const palavrasChave = arcano.palavrasChave ?? [];
  const elemento = arcano.elemento ?? '';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: persona?.fraseBoasVindas || `Eu sou ${arcanaName}. O que deseja desvendar hoje?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Contextual Response Logic
    setTimeout(() => {
      let responseText = "";

      // 1. Keyword Matching
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('medo') || lowerInput.includes('sombra')) {
        responseText = `Sua sombra em ${arcanaName} pede integração. ${sombras.length ? sombras[0] : 'Olhe para onde você evita olhar.'}`;
      } else if (lowerInput.includes('amor') || lowerInput.includes('relacionamento')) {
        responseText = `Nos relacionamentos, lembre-se: ${conselhos.length ? conselhos[0] : 'O outro é seu espelho.'}`;
      } else if (lowerInput.includes('trabalho') || lowerInput.includes('carreira')) {
        responseText = "Sua vocação chama. Você está ouvindo ou apenas ocupado?";
      } else {
        // 2. Fallback to Persona/Element/Advice
        const genericResponses = [
          elemento
            ? `Como um arcano de ${elemento}, sinto que fluxo é necessário agora.`
            : 'Sinto que o fluxo é necessário agora.',
          "A resposta está no silêncio entre seus pensamentos.",
          "Observe como os ciclos se repetem na sua vida. O que você fará diferente?",
          `O conselho do arcano é: ${conselhos.length ? conselhos[Math.floor(Math.random() * conselhos.length)] : 'Confie no processo.'}`,
          "Essa dúvida ecoa uma sombra antiga. Você está pronto para enfrentá-la?",
          "O universo conspira a seu favor, mas exige movimento.",
          "Respire. A alquimia da sua alma já está transformando chumbo em ouro.",
          `Medite sobre a palavra-chave: ${palavrasChave.length ? palavrasChave[Math.floor(Math.random() * palavrasChave.length)] : 'Transformação'}.`
        ];
        // Deterministic pseudo-random
        const responseIndex = (userMsg.text.length + Date.now()) % genericResponses.length;
        responseText = genericResponses[responseIndex];
      }

      const botMsg: Message = { id: Date.now() + 1, role: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl h-full flex flex-col overflow-hidden relative shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mystic-gold to-yellow-700 flex items-center justify-center text-black shadow-lg">
              <Bot size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-white font-serif text-sm font-bold">{arcanaName}</h3>
            <p className="text-[10px] text-mystic-gold uppercase tracking-wider">{persona?.tomDeVoz}</p>
          </div>
        </div>
        <div className="p-2 bg-white/5 rounded-full">
          <Sparkles size={16} className="text-mystic-gold opacity-50" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-md ${msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
              }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 rounded-2xl rounded-bl-none p-4 flex gap-1.5 items-center border border-white/5">
              <span className="w-2 h-2 bg-mystic-gold/50 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-mystic-gold/50 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-mystic-gold/50 rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5 z-10">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte ao Oráculo..."
            className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-mystic-gold/50 focus:bg-black/50 transition-all placeholder-white/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-2 w-10 h-10 bg-mystic-gold hover:bg-white text-black rounded-lg flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};