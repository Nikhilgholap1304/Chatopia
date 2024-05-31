/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': { 'min': '450px' },
        '2xs': { 'min': '320px' },
      },
      fontFamily: {
        roboto: ['Roboto'],
        adventPro: ['Advent Pro']
      },
      colors: {
        dark1: "#251d1d",
        dark2: "#332828",
        primary: "#3E3232",
        secondary: "#503C3C",
        accent: "#7E6363",
        light: "#A87C7C",
        lighter: "#C29999",
        lightest: "#E0B6B6",
        graymain: "#181818",
        graysurface: "#212121",
        grayborder: "#0f0f0f",
        graysecondarytextcolor: "#aaaaaa",
        grayinputborder: "#2f2f2f",
        graylightsecondarytextcolor: "rgba(170, 170, 170, 0.08)",
      },
    },
  },
  plugins: [],
});


