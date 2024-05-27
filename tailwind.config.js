/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto']
      },
      colors: {
        color: {
          1: "#3E3232",
          2: "#503C3C",
          3: "#7E6363",
          4: "#A87C7C",
          5: "#C29999",
          6: "#E0B6B6",
        }
      }
    },
  },
  plugins: [],
}

