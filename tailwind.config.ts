import type { Config } from "tailwindcss";

const config: Config = {
  // Hapus tulisan "./src/..." karena kamu tidak pakai folder src
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;