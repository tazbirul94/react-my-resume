/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          dark:    'rgb(var(--accent-hover) / <alpha-value>)',
        },
        /* Apple semantic tokens */
        'apple-bg':        'rgb(var(--bg-primary) / <alpha-value>)',
        'apple-bg-2':      'rgb(var(--bg-secondary) / <alpha-value>)',
        'apple-bg-3':      'rgb(var(--bg-tertiary) / <alpha-value>)',
        'apple-text':      'rgb(var(--text-primary) / <alpha-value>)',
        'apple-text-2':    'rgb(var(--text-secondary) / <alpha-value>)',
        'apple-text-3':    'rgb(var(--text-tertiary) / <alpha-value>)',
        'apple-accent':    'rgb(var(--accent) / <alpha-value>)',
        'apple-border':    'rgb(var(--apple-border) / <alpha-value>)',
        /* Tailwind semantic (kept for ui/ components) */
        background:   'hsl(var(--background))',
        foreground:   'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease both',
      },
    },
  },
  plugins: [],
}
