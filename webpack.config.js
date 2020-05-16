const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const publicPath = process.env.NODE_ENV === 'development'
  ? path.resolve(__dirname, 'dist')
  : 'https://www.jacksontenclay.com/';

module.exports = env => ({
  entry: './assets/scripts/main.js',
  output: {
    path: path.resolve(__dirname, '.tmp/dist/assets', env.cachebust_string.toString()),
    filename: 'scripts/bundle.js',
    publicPath: publicPath + env.cachebust_string + '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'styles/fonts/',
            publicPath: './fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/site.css"
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin()
  ]
});
