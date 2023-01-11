/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{pug,html}", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "halloween"],
  },
}
