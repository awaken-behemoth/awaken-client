const themes = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
};

const processed = {};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? parseInt(result[1], 16) +
        " " +
        parseInt(result[2], 16) +
        " " +
        parseInt(result[3], 16)
    : null;
}

Object.keys(themes).forEach((color) => {
  processed[color] = {};
  Object.keys(themes[color]).forEach((theme) => {
    processed[color]["--p-" + theme] = hexToRgb(themes[color][theme]);
  });
});

console.log(processed);
