/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/banner.png')", // chú ý dấu / ở đầu
      },
    },
  },
  plugins: [],
};

