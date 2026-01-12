/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // California State Championship Theme
        // Primary Red (California star)
        cal: {
          red: '#c41e3a',
          'red-dark': '#9a1830',
          'red-light': '#e63950',
        },
        // Bear Brown Tones
        bear: {
          dark: '#3d2914',
          medium: '#5d4e37',
          light: '#8b7355',
          tan: '#a08060',
        },
        // Grass/Nature Green
        grass: {
          DEFAULT: '#7cb518',
          light: '#9ed93a',
          dark: '#5a8a10',
        },
        // Dark Mode Surfaces
        surface: {
          950: '#0a0a0a',
          900: '#0d0d0d',
          850: '#111111',
          800: '#1a1a1a',
          700: '#252525',
          600: '#333333',
          500: '#444444',
        },
        // Light Mode Surfaces
        light: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
        },
        // Accent Colors
        accent: {
          white: '#ffffff',
          gray: '#9ca3af',
          'gray-dark': '#6b7280',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cal': 'linear-gradient(135deg, #c41e3a 0%, #9a1830 100%)',
        'gradient-bear': 'linear-gradient(135deg, #8b7355 0%, #5d4e37 50%, #3d2914 100%)',
        'gradient-nature': 'linear-gradient(135deg, #7cb518 0%, #5a8a10 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-light': 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
        'gradient-mixed': 'linear-gradient(135deg, #c41e3a 0%, #5d4e37 50%, #7cb518 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(196, 30, 58, 0.4), 0 0 40px rgba(196, 30, 58, 0.2)',
        'glow-green': '0 0 20px rgba(124, 181, 24, 0.4), 0 0 40px rgba(124, 181, 24, 0.2)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15)',
        'glow-brown': '0 0 20px rgba(139, 115, 85, 0.4), 0 0 40px rgba(139, 115, 85, 0.2)',
        // Light mode shadows - more subtle, no glow
        'card-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-light-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(196, 30, 58, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(196, 30, 58, 0.5)' },
        },
        wave: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}
