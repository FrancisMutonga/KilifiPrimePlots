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
        kilifigreen: {
          light: "#fdf4e5",
          DEFAULT: "#2E7D32",
          dark: "#e3a24d",
        },
        beige: "#F4EAD5",
        warm: "#9E9E9E",
        dark: "#333333",
        linkgreen: "#10441C",
      },
    },
  },
  plugins: [],
} satisfies Config;
