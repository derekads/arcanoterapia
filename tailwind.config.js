/** @type {import('tailwindcss').Config} */

// Este tema era um `tailwind.config = {...}` dentro de uma <script> no
// index.html, lido em tempo de execução pela Play CDN do Tailwind. Agora ele é
// lido no build, e o CSS sai pronto no `dist`. O conteúdo é o mesmo.
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],

    // A única classe montada por concatenação no app está em AstralChart.tsx
    // (`bg-${color}-500/10`), que o scanner não tem como enxergar.
    safelist: [
        'bg-orange-500/10', 'text-orange-400',
        'bg-blue-500/10', 'text-blue-400',
        'bg-purple-500/10', 'text-purple-400',
    ],

    theme: {
        extend: {
            fontFamily: {
                serif: ['Cinzel', 'serif'],
                sans: ['Lato', 'sans-serif'],
            },
            colors: {
                'deep-purple': '#1a0b2e',
                'midnight-blue': '#0b1021',
                'mystic-gold': '#D4AF37',
                'neon-cyan': '#22D3EE',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'nebula': 'nebula 15s ease infinite alternate',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                nebula: {
                    '0%': { transform: 'scale(1)', opacity: '0.4' },
                    '100%': { transform: 'scale(1.2)', opacity: '0.6' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(212,175,55, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(212,175,55, 0.6), 0 0 10px rgba(212,175,55, 0.4)' },
                },
            },
        },
    },
    plugins: [],
};
