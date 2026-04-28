import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream:       '#F5EDD8',
          'cream-dark':'#EDE0C4',
          green:       '#2D4A2D',
          'green-light':'#3D6B3D',
          'green-pale': '#EBF0EB',
          peach:       '#E8956D',
          'peach-light':'#F0B090',
          'peach-dark': '#D07050',
          white:       '#FFFFFF',
          brown:       '#7A5C3A',
          'text-dark':  '#1C2B1C',
          'text-mid':   '#4A6040',
          'text-light':  '#8A9A7A',
        },
      },
      fontFamily: {
        cormorant:  ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        heading:    ['var(--font-playfair)', 'Georgia', 'serif'],
        cursive:    ['var(--font-dancing)', 'cursive'],
        body:       ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
