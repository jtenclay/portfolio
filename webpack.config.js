const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// for scss
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "../styles/style.css",
});

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: 'bundle.js',
    publicPath: 'dist'
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
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            }, {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../styles/fonts/',
            publicPath: './fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    extractSass,
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};