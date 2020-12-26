const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .webpackConfig({
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.vue',
      ],
      alias: {
        '@': path.join(__dirname, '/resources/js'),
      },
    },
    output: {
      filename:'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
  })
  .js('resources/js/main.js', 'public/main.js')
  .extract([
    'axios',
    'vue',
    'vue-axios',
    'vue-i18n',
    'vue-router',
    'vuetify',
    'vuex',
  ], 'vendor.js')
  .sourceMaps();
