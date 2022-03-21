function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: withOpacityValue("--p-50"),
          100: withOpacityValue("--p-100"),
          200: withOpacityValue("--p-200"),
          300: withOpacityValue("--p-300"),
          400: withOpacityValue("--p-400"),
          500: withOpacityValue("--p-500"),
          600: withOpacityValue("--p-600"),
          700: withOpacityValue("--p-700"),
          800: withOpacityValue("--p-800"),
          900: withOpacityValue("--p-900"),
        },
      },
    },
  },
  plugins: [],
};
