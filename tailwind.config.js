/** @type {import('tailwindcss').Config} */
import colors from "./src/data/mocks/colors.data";
import fontSize from "./src/data/mocks/font_size.data";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
      fontSize,
      animation: {
        toast: "appear 0.3s forwards, disappear 0.3s 2.5s forwards",
        ripple: "ripple 0.6s linear forwards",
      },
      keyframes: {
        appear: {
          "0%": {
            maxHeight: "0",
            opacity: "0",
            right: "-100%",
          },
          "100%": {
            maxHeight: "160px",
            opacity: "1",
            right: "20px",
          },
        },
        disappear: {
          "0%": {
            maxHeight: "160px",
            opacity: "1",
            right: "20px",
          },
          "100%": {
            maxHeight: "0",
            opacity: "0",
            right: "-100%",
          },
        },
        ripple: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(2)",
            opacity: "0",
          },
        },
      },
    },
    container: {
      padding: "24px",
      center: true,
    },
  },
  plugins: [],
};
