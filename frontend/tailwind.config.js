/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1E4FC4",
          light: "#EFF4FF",
        },
        secondary: {
          DEFAULT: "#10B981",
          dark: "#0C9468",
        },
        accent: {
          DEFAULT: "#F59E0B",
        },
        surface: "#F8FAFC",
        card: "#FFFFFF",
        ink: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
        },
        border: "#E2E8F0",
        danger: {
          DEFAULT: "#EF4444",
          dark: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        md: "0.5rem",
        lg: "0.75rem",
      },
    },
  },
  plugins: [],
}
