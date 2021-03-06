var webpack = require('webpack');
var extract = require("extract-text-webpack-plugin");
var copy    = require("copy-webpack-plugin");
var clean   = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ["./web/static/js/app.js", "./web/static/css/app.css"],
    lib: ["./web/static/js/lib.js", "./web/static/css/lib.css"]
  },
  output: {
    path: "./priv/static/",
    filename: "js/[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ['transform-runtime', 'transform-decorators-legacy']
      }
    }, {
      test: /\.css$/,
      loader: extract.extract("style-loader", "css-loader")
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("lib", "js/lib.js"),
    new extract("css/[name].css"),
    new copy([{from: "./web/static/assets"}]),
    new clean(['./priv/static']),
  ],
  resolve: {
    root: (__dirname + "/web/static")
  }
};
