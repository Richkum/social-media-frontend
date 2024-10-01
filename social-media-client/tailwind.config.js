module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        deepSkyBlue: {
          DEFAULT: "#00BFFF",
          50: "#E6F9FF",
          100: "#CCF3FF",
          200: "#99E6FF",
          300: "#66DAFF",
          400: "#33CDFF",
          500: "#00BFFF",
          600: "#0099CC",
          700: "#007399",
          800: "#004C66",
          900: "#002633",
        },
        skyBlue: {
          DEFAULT: "#87CEEB",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#D6EEFA",
          400: "#AEDDF5",
          500: "#87CEEB",
          600: "#5ABBE3",
          700: "#2DA8DB",
          800: "#2188B6",
          900: "#19688C",
        },
      },
    },
  },
  plugins: [],
};
