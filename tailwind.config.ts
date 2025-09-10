import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#E11900",
          hover: "#C31500",
          ring: "#FDE8E5",
          50: "#FFF1EF",
          600: "#C31500",
          700: "#A30F00",
        },
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
} satisfies Config;
