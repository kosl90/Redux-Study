const path = require("path")
const webpack = require("webpack")
const SRC_PATH = path.resolve(__dirname, "app")

module.exports = {
  entry: SRC_PATH,
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "static"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: SRC_PATH
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8000
  }
}
