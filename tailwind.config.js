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
      "255-red":"#FF0000",
      "Charcoal":"#2F4858",
      "Lapis":"#33658A",
      "Carolina":"#86BBD8",
      "Mimi":"#F5D7E3",
      "Cherry":"#F4A5AE",
      "Amara":"#DD99BB",
     
    },

  },
  plugins: [
    require("flowbite/plugin")
  ],
  
}
