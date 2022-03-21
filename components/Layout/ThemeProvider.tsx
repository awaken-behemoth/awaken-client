interface Theme {
  "--p-50": string;
  "--p-100": string;
  "--p-200": string;
  "--p-300": string;
  "--p-400": string;
  "--p-500": string;
  "--p-600": string;
  "--p-700": string;
  "--p-800": string;
  "--p-900": string;
}

interface Themes {
  blue: Theme;
  purple: Theme;
}

const themes: Themes = {
  blue: {
    "--p-50": "239 246 255",
    "--p-100": "219 234 254",
    "--p-200": "191 219 254",
    "--p-300": "147 197 253",
    "--p-400": "96 165 250",
    "--p-500": "59 130 246",
    "--p-600": "37 99 235",
    "--p-700": "29 78 216",
    "--p-800": "30 64 175",
    "--p-900": "30 58 138",
  },
  purple: {
    "--p-50": "250 245 255",
    "--p-100": "243 232 255",
    "--p-200": "233 213 255",
    "--p-300": "216 180 254",
    "--p-400": "192 132 252",
    "--p-500": "168 85 247",
    "--p-600": "147 51 234",
    "--p-700": "126 34 206",
    "--p-800": "107 33 168",
    "--p-900": "88 28 135",
  },
};
interface Props {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <div
      className=" text-gray-900 dark:bg-black"
      style={themes["blue"] as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
