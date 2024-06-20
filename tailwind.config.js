/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // White
        secondary: "#f0f0f0", // Light gray
        accent: "#007bff", // Dark blue
        text: "#212529", // Black
        background: "#fff", // White
        error: "#dc3545", // Red
        success: "#28a745", // Green
        warning: "#ffc107", // Yellow
        info: "#17a2b8", // Light blue
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
