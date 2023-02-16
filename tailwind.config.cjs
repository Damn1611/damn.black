/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("daisyui")],

  daisyui: {
    themes: [{
      default: {
        "primary": "#661AE6",
        "secondary": "#D926AA",
        "tertiary": "#7340cc",
        "accent": "#1FB2A5",
        "neutral": "#191D24",
        "base-100": "#2A303C",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
      },
    }, ],
  },

}