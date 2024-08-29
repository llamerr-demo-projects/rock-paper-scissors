import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '639px' },
    },
    extend: {
      colors: {
        'button-blue': 'rgb(23 34 64)',
      },
      boxShadow: {
        triple:
          '0 0 0rem min(6vh,6vw) rgb(147, 197, 253, 0.05), 0 0 0rem min(14vh,14vw) rgb(147, 197, 253, 0.05), 0 0 0rem min(24vh,24vw) rgb(147, 197, 253, 0.05);',
      },
      backgroundImage: {
        radial:
          'radial-gradient(circle at 50% 0%, rgba(31, 54, 86, 1) 0%, rgba(19, 22, 55, 1) 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
