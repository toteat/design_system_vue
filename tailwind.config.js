/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: 'var(--text-xs--line-height)' }],
        'sm': ['var(--text-sm)', { lineHeight: 'var(--text-sm--line-height)' }],
        'base': ['var(--text-base)', { lineHeight: 'var(--text-base--line-height)' }],
        'lg': ['var(--text-lg)', { lineHeight: 'var(--text-lg--line-height)' }],
        'xl': ['var(--text-xl)', { lineHeight: 'var(--text-xl--line-height)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--text-2xl--line-height)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--text-3xl--line-height)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--text-4xl--line-height)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--text-5xl--line-height)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--text-6xl--line-height)' }],
      },
      colors: {
        'primary': 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'secondary': 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',
        'tertiary': 'var(--color-tertiary)',
        'tertiary-light': 'var(--color-tertiary-light)',
        'neutral': 'var(--color-neutral)',
        'neutral-100': 'var(--color-neutral-100)',
        'neutral-200': 'var(--color-neutral-200)',
        'neutral-300': 'var(--color-neutral-300)',
        'neutral-400': 'var(--color-neutral-400)',
        'neutral-500': 'var(--color-neutral-500)',
      }
    },
  },
  plugins: [],
}
