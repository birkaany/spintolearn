import type { Config } from "tailwindcss";

const config: Config = {
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
        "purple-300": "#8170F2",
        "purple-200": "#B48DF9",
        "blue-300": "#4DD2FF",
        "blue-200": "#2474FF"
      },
    },
  },
  plugins: [],
};
export default config;
