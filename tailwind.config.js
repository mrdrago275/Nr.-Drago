module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        matte: "#000000",
        silver: "#C0C0C0",
        luxury: "#E60023"
      },
      fontFamily: {
        display: ['"Canela"', '"Playfair Display"', "serif"],
        ui: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
