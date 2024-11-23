/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./templates/**/*.html",
      "./static/src/**/*.js",
      "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      "page-black":"#212529",
      "nav-black":"#1d2125",
    },

  },
  plugins: [
    require("flowbite/plugin")
  ],
  
}
