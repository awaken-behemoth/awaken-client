import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FadeIn from "../Effect/FadeIn";
import Brush from "../Icon/Brush";

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

type Themes = typeof themes;

export const themes = {
  gray: {
    "--p-50": "249 250 251",
    "--p-100": "244 245 247",
    "--p-200": "229 231 235",
    "--p-300": "210 214 220",
    "--p-400": "159 166 178",
    "--p-500": "107 114 128",
    "--p-600": "75 85 99",
    "--p-700": "55 65 81",
    "--p-800": "37 47 63",
    "--p-900": "22 30 46",
  },
  "cool-gray": {
    "--p-50": "251 253 254",
    "--p-100": "241 245 249",
    "--p-200": "226 232 240",
    "--p-300": "207 216 227",
    "--p-400": "151 166 186",
    "--p-500": "100 116 139",
    "--p-600": "71 85 105",
    "--p-700": "54 65 82",
    "--p-800": "39 48 63",
    "--p-900": "26 32 46",
  },
  red: {
    "--p-50": "253 242 242",
    "--p-100": "253 232 232",
    "--p-200": "251 213 213",
    "--p-300": "248 180 180",
    "--p-400": "249 128 128",
    "--p-500": "240 82 82",
    "--p-600": "224 36 36",
    "--p-700": "200 30 30",
    "--p-800": "155 28 28",
    "--p-900": "119 29 29",
  },
  orange: {
    "--p-50": "255 248 241",
    "--p-100": "254 236 220",
    "--p-200": "252 217 189",
    "--p-300": "253 186 140",
    "--p-400": "255 138 76",
    "--p-500": "255 90 31",
    "--p-600": "208 56 1",
    "--p-700": "180 52 3",
    "--p-800": "138 44 13",
    "--p-900": "119 29 29",
  },
  yellow: {
    "--p-50": "253 253 234",
    "--p-100": "253 246 178",
    "--p-200": "252 233 106",
    "--p-300": "250 202 21",
    "--p-400": "227 160 8",
    "--p-500": "194 120 3",
    "--p-600": "159 88 10",
    "--p-700": "142 75 16",
    "--p-800": "114 59 19",
    "--p-900": "99 49 18",
  },
  green: {
    "--p-50": "243 250 247",
    "--p-100": "222 247 236",
    "--p-200": "188 240 218",
    "--p-300": "132 225 188",
    "--p-400": "49 196 141",
    "--p-500": "14 159 110",
    "--p-600": "5 122 85",
    "--p-700": "4 108 78",
    "--p-800": "3 84 63",
    "--p-900": "1 71 55",
  },
  teal: {
    "--p-50": "237 250 250",
    "--p-100": "213 245 246",
    "--p-200": "175 236 239",
    "--p-300": "126 220 226",
    "--p-400": "22 189 202",
    "--p-500": "6 148 162",
    "--p-600": "4 116 129",
    "--p-700": "3 102 114",
    "--p-800": "5 80 92",
    "--p-900": "1 68 81",
  },
  blue: {
    "--p-50": "235 245 255",
    "--p-100": "225 239 254",
    "--p-200": "195 221 253",
    "--p-300": "164 202 254",
    "--p-400": "118 169 250",
    "--p-500": "63 131 248",
    "--p-600": "28 100 242",
    "--p-700": "26 86 219",
    "--p-800": "30 66 159",
    "--p-900": "35 56 118",
  },
  indigo: {
    "--p-50": "240 245 255",
    "--p-100": "229 237 255",
    "--p-200": "205 219 254",
    "--p-300": "180 198 252",
    "--p-400": "141 162 251",
    "--p-500": "104 117 245",
    "--p-600": "88 80 236",
    "--p-700": "81 69 205",
    "--p-800": "66 56 157",
    "--p-900": "54 47 120",
  },
  purple: {
    "--p-50": "246 245 255",
    "--p-100": "237 235 254",
    "--p-200": "220 215 254",
    "--p-300": "202 191 253",
    "--p-400": "172 148 250",
    "--p-500": "144 97 249",
    "--p-600": "126 58 242",
    "--p-700": "108 43 217",
    "--p-800": "85 33 181",
    "--p-900": "74 29 150",
  },
  pink: {
    "--p-50": "253 242 248",
    "--p-100": "252 232 243",
    "--p-200": "250 209 232",
    "--p-300": "248 180 217",
    "--p-400": "241 126 184",
    "--p-500": "231 70 148",
    "--p-600": "214 31 105",
    "--p-700": "191 18 93",
    "--p-800": "153 21 75",
    "--p-900": "117 26 61",
  },
};

interface Props {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTheme, _setActiveTheme] = useState<keyof Themes>("blue");

  useEffect(() => {
    _setActiveTheme(
      (localStorage.getItem("primaryTheme") as keyof Themes) || "blue"
    );
  }, []);

  const setActiveTheme = (theme: keyof Themes) => {
    _setActiveTheme(theme);
    localStorage.setItem("primaryTheme", theme);
  };

  return (
    <>
      <div
        className=" text-gray-900 dark:bg-black"
        style={themes[activeTheme] as React.CSSProperties}
      >
        {children}

        <div className="fixed bottom-8 right-8">
          <motion.div
            className="absolute bottom-0 rounded-md text-gray-800 right-0 z-10 origin-bottom-right bg-gray-50 overflow-hidden shadow-2xl"
            animate={
              (isVisible && { scale: 1, opacity: 1 }) || {
                scale: 0.2,
                opacity: 0,
                pointerEvents: "none",
              }
            }
          >
            {Object.keys(themes).map((theme: keyof Themes) => {
              return (
                <div key={theme}>
                  <input id={theme} type="radio" className="hidden"></input>
                  <label
                    htmlFor={theme}
                    style={themes[theme] as React.CSSProperties}
                    className="py-1 px-5 whitespace-nowrap hover:bg-primary-600 hover:text-white block"
                    onClick={() => {
                      if (activeTheme == theme) return;
                      setActiveTheme(theme);
                      setIsVisible(false);
                    }}
                  >
                    {theme}
                  </label>
                </div>
              );
            })}
          </motion.div>
          <motion.div
            onClick={(e) => setIsVisible(!isVisible)}
            className=" shadow-black shadow-2xl origin-bottom-right relative rounded-md h-12 w-12 p-2"
            animate={(isVisible && { scale: 1.2, opacity: 0 }) || { scale: 1 }}
          >
            <Brush onClick={(e) => setIsVisible(!isVisible)} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ThemeProvider;
