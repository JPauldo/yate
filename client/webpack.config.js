const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// // TODO: Add and configure workbox plugins for a service worker and manifest file.
// // TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Y.A.T.E.'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './service-worker.js'
      }),
      new MiniCssExtractPlugin(),
      new WebpackPwaManifest({
        name: 'Yet Another Text Another',
        short_name: 'Y.A.T.E.',
        description: 'Similar to YAML but with a text editor!',
        background_color: '#F0F8FF',
        theme_color: '#F0F8FF',
        start_url: './',
        public: './',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              preset: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          }
        }
      ],
    },
  };
};
