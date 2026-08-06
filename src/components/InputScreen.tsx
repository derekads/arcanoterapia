import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Sparkles, AlertCircle, Check, MapPin } from 'lucide-react';
import { UserBirthData } from '../types';
import { CityAutocomplete } from './CityAutocomplete';

interface Props {
  onSubmit: (data: UserBirthData) => void;
}

const InputScreen: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserBirthData>({
    nome: '',
    dataNascimento: '',
    horaNascimento: '',
    localizacao: {
      latitude: 0,
      longitude: 0,
      timezoneOffset: 0,
      nomeCidade: ''
    }
  });

  // State for the masked display value (DD/MM/YYYY)
  const [dateDisplay, setDateDisplay] = useState('');
  const [cityVerified, setCityVerified] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir apenas letras e espaços (inclui acentos comuns em PT-BR)
    const sanitizedName = e.target.value.replace(/[^a-zA-ZáàãâéèêíïóôõöúçñÁÀÃÂÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
    setFormData(prev => ({ ...prev, nome: sanitizedName }));
    setError('');
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, horaNascimento: e.target.value }));
    setError('');
  };

  // Mask Logic for Date (DD/MM/YYYY)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

    if (value.length > 8) value = value.substring(0, 8); // Limit to 8 digits

    // Apply mask
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    if (value.length > 4) {
      formatted = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4)}`;
    }

    setDateDisplay(formatted);
    setError('');

    // Update underlying state ONLY if full date
    if (value.length === 8) {
      const day = value.substring(0, 2);
      const month = value.substring(2, 4);
      const year = value.substring(4, 8);
      // Store as ISO YYYY-MM-DD for consistency with backend/astronomy engine
      setFormData(prev => ({ ...prev, dataNascimento: `${year}-${month}-${day}` }));
    } else {
      // Clear if incomplete to prevent premature submission validation issues
      setFormData(prev => ({ ...prev, dataNascimento: '' }));
    }
  };

  const handleCitySelect = (cityData: any) => {
    const estimatedOffset = Math.round(cityData.longitude / 15);

    setFormData(prev => ({
      ...prev,
      localizacao: {
        latitude: cityData.latitude,
        longitude: cityData.longitude,
        timezoneOffset: estimatedOffset,
        nomeCidade: `${cityData.name}, ${cityData.admin1 || cityData.country}`
      }
    }));
    setCityVerified(true);
    setError('');
  };

  const validateDate = (day: string, month: string, year: string) => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    const now = new Date();

    if (y < 1900 || y > now.getFullYear()) return false;
    if (m < 1 || m > 12) return false;

    const daysInMonth = new Date(y, m, 0).getDate();
    if (d < 1 || d > daysInMonth) return false;

    const inputDate = new Date(y, m - 1, d);
    if (inputDate > now) return false;

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.nome.trim().length < 3) {
      setError('Por favor, insira seu nome completo.');
      return;
    }

    // Validate Date
    if (dateDisplay.length !== 10) {
      setError('Data de nascimento incompleta.');
      return;
    }
    const [day, month, year] = dateDisplay.split('/');
    if (!validateDate(day, month, year)) {
      setError('Data de nascimento inválida.');
      return;
    }

    if (!formData.horaNascimento) {
      setError('A hora é obrigatória para calcular seu Ascendente corretamente.');
      return;
    }
    if (!cityVerified || !formData.localizacao.latitude) {
      setError('Por favor, selecione uma cidade da lista.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-4xl mx-auto"
    >
      <div className="w-full bg-[#0b1021]/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-visible">
        {/* Decorative glint */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mystic-gold to-transparent opacity-50" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white/5 rounded-full mb-4 border border-white/5">
            <Sparkles className="w-6 h-6 text-mystic-gold" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2">
            Dados de Origem
          </h2>
          <p className="text-blue-200/60 text-sm">
            Para a precisão alquímica do seu mapa, insira seus dados exatos de nascimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Nome */}
          <div className="group">
            <label className="text-xs text-mystic-gold uppercase tracking-widest font-bold mb-1 ml-1 flex items-center gap-1">
              <User size={12} /> Nome Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.nome}
              onChange={handleNameChange}
              placeholder="Seu nome de batismo ou civil"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-mystic-gold/50 focus:bg-black/40 transition-all font-serif"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Data (Masked) */}
            <div className="group">
              <label className="text-xs text-mystic-gold uppercase tracking-widest font-bold mb-1 ml-1 flex items-center gap-1">
                <Calendar size={12} /> Data de Nascimento
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="birthDate"
                value={dateDisplay}
                onChange={handleDateChange}
                placeholder="DD/MM/AAAA"
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-mystic-gold/50 focus:bg-black/40 transition-all font-mono tracking-wider"
              />
            </div>

            {/* Hora */}
            <div className="group">
              <label className="text-xs text-mystic-gold uppercase tracking-widest font-bold mb-1 ml-1 flex items-center gap-1">
                <Clock size={12} /> Hora de Nascimento
              </label>
              <input
                type="time"
                name="birthTime"
                value={formData.horaNascimento}
                onChange={handleTimeChange}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-mystic-gold/50 focus:bg-black/40 transition-all [color-scheme:dark]"
              />
              <span className="text-[10px] text-gray-400 ml-1 mt-1 block flex items-center gap-1">
                <AlertCircle size={10} /> Use formato 24h (Ex: 08:00 manhã / 20:00 noite)
              </span>
            </div>
          </div>

          {/* Local Autocomplete */}
          <div className="relative z-50">
            <CityAutocomplete onSelect={handleCitySelect} initialValue={formData.localizacao.nomeCidade} />

            {cityVerified && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-2 ml-1"
              >
                <Check size={12} className="text-green-400" />
                <p className="text-[10px] text-green-400/80">
                  {formData.localizacao.nomeCidade} ({formData.localizacao.latitude.toFixed(2)}, {formData.localizacao.longitude.toFixed(2)})
                </p>
              </motion.div>
            )}
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-bold bg-red-900/20 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!cityVerified}
              className="w-full md:w-auto flex justify-center items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-full font-semibold tracking-wide hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Despertar meu Arcano
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default InputScreen;