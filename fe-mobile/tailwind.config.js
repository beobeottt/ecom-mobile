/** @type {import('tailwindcss').Config} */
module.exports = {
  // Đảm bảo đường dẫn này khớp 100% với cấu trúc thư mục của bạn
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};