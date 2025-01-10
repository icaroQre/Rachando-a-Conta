import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2B2D42",
        secondary: "#8D99AE",
        blue: "#29B6F6",
        bluehover: "#008AC9",
        red: "#EF233C",
        green: "#38B000",
        greenhover: "#2C8603",
        text: {
          primary: "#2B2D42",
          secondary: "#8D99AE",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
