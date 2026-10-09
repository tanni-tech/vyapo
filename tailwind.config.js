/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        blue: 'var(--blue)',
        orange: 'var(--orange)',
        white: 'var(--white)',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Anton', 'Impact', 'sans-serif'],
        body: ['var(--font-general-sans)', 'General Sans', 'DM Sans', 'sans-serif'],
        bengali: ['var(--font-anek-bangla)', 'Anek Bangla', 'Noto Sans Bengali', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
