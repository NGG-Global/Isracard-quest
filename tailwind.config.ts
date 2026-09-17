import type { Config } from 'tailwindcss'

/**
 * Isracard design tokens (from the Isracard/NGG deck design system).
 * Colours, radii, shadow and type family are taken as-is; nothing here is invented.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        assistant: ['Assistant', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        isracard: {
          blue: '#2221ba',
          ink: '#000000',
        },
        accent: {
          violet: '#763af8',
          purple: '#8227ff',
          periwinkle: '#7b7bff',
          peach: '#ffbb80',
          'peach-alt': '#febf8a',
          amber: '#ffa229',
          orange: '#ff5001',
        },
        neutral: {
          line: '#bfbfbf',
          e8: '#e8e8e8',
          shadow: '#41464d',
        },
      },
      borderRadius: {
        card: '37px',
        tile: '23px',
      },
      boxShadow: {
        card: '0 5.33px 13.33px rgba(65,70,77,.5)',
      },
      lineHeight: {
        tight: '0.9',
        body: '1.25',
      },
    },
  },
  plugins: [],
} satisfies Config
