export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        accent: {
          listen: '#7c3aed',
          slow: '#14b8a6',
          lips: '#f97316',
          practice: '#ef4444',
        }
      },
      fontSize: {
        'phrase': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'title': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      }
    }
  },
  plugins: [],
}
