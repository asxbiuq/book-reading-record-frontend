

module.exports = {
  // plugins: {
  //   'postcss-import': {},
  //   'tailwindcss/nesting': {},//嵌套支持
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
  plugins: [
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 3,
      features: { 'nesting-rules': false }
    }),
    require('autoprefixer'),
    require('cssnano'),
  ]
}