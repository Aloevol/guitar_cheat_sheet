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
        bg:        '#131313',
        bg2:       '#0d0b08',
        bg3:       '#0e0e0e',
        surface:   '#1c1b1b',
        card:      '#201f1f',

        /* Borders */
        border:    'rgba(169,138,125,.1)',
        border2:   'rgba(169,138,125,.18)',

        /* Ember palette */
        ember:     '#ff6b00',
        'ember-l': '#ffb693',
        amber:     '#ffdb9d',

        /* Text */
        cream:     '#e5e2e1',
        muted:     '#e2bfb0',
        outline:   '#a98a7d',

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
        display: ["'Noto Serif'", 'Georgia', 'serif'],
        serif:   ["'Noto Serif'", 'Georgia', 'serif'],
        sans:    ["'Inter'", 'system-ui', 'sans-serif'],
        mono:    ["'Inter'", 'system-ui', 'sans-serif'],
        body:    ["'Inter'", 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      spacing: {
        'xxl': '80px',
        'xl':  '48px',
        'lg':  '24px',
        'md':  '16px',
        'sm':  '8px',
        'xs':  '4px',
        'gutter': '24px',
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
