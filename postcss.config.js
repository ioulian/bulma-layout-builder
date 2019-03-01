module.exports = {
  plugins: [
    require('@csstools/postcss-sass')(),
    require('postcss-import')({
      path: ['src/css'],
    }),
    require('postcss-extend'),
    require('postcss-nested'),
    require('postcss-short'),
    require('postcss-utilities'),
    require('postcss-assets'),
    require('postcss-preset-env'),
    require('postcss-css-variables')({
      preserve: true,
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
