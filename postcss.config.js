module.exports = {
  // plugins: {
  //   'postcss-import': {},
  //   'tailwindcss/nesting': {},//嵌套支持
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
