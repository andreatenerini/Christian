import type { Config } from 'tailwindcss'

// Palette campionata dal logo Americanitalia (sole a strisce)
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sun: {
          red: '#E5401B',
          orange: '#F7900F',
          gold: '#EDB040',
          sand: '#D9CC94',
        },
        sage: { DEFAULT: '#ACC494', light: '#C8D9B4' },
        mint: '#7FAE90',
        teal: { DEFAULT: '#3F7F6C', dark: '#2A6455' },
        petrol: { DEFAULT: '#174940', deep: '#0F2E29', ink: '#0B1F1C' },
        navy: '#253A4D',
        cream: { DEFAULT: '#FBF5EA', dark: '#F2E8D6' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15,46,41,0.25)',
        lift: '0 24px 60px -20px rgba(15,46,41,0.45)',
        glow: '0 12px 40px -8px rgba(247,144,15,0.55)',
      },
      backgroundImage: {
        sunset: 'linear-gradient(180deg, #E5401B 0%, #F7900F 45%, #EDB040 75%, #D9CC94 100%)',
        'sunset-x': 'linear-gradient(90deg, #E5401B 0%, #F7900F 50%, #EDB040 100%)',
        sea: 'linear-gradient(180deg, #ACC494 0%, #7FAE90 35%, #3F7F6C 65%, #174940 100%)',
      },
      animation: {
        'hero-zoom': 'heroZoom 26s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        heroZoom: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.1)' } },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translate(0,0) rotate(-8deg)' },
          '50%': { transform: 'translate(6px,-8px) rotate(-6deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
