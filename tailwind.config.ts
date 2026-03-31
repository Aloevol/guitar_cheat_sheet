import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Background layers */
        bg:        'var(--bg)',
        bg2:       'var(--bg2)',
        bg3:       'var(--bg3)',
        surface:   'var(--surface)',
        card:      'var(--card)',

        /* Borders */
        border:    'rgba(255,255,255,.06)',
        border2:   'rgba(255,255,255,.10)',

        /* Gold palette */
        gold:      '#c9a84c',
        'gold-l':  '#f0c93a',
        'gold-xl': '#f5d878',
        amber:     '#d4842a',
        cream:     '#f5edda',

        /* Category accents */
        scales:       '#f0c93a',
        modes:        '#5fd3c8',
        chords:       '#6eb4ff',
        progressions: '#b987f5',
        techniques:   '#ff8c42',
        theory:       '#4dd98a',
        tunings:      '#ff6b8a',
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        mono:    ["'Space Mono'", 'monospace'],
        body:    ["'Lora'", 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
