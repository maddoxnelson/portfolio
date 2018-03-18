const webpack = require("webpack");
const PurifyCSSPlugin = require("purifycss-webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // defaults to localhost
    port, // defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    }
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    // allChunks is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: "[name].[contenthash:8].css",
  });

  return {
    module: {
      rules: [{
        test: /\.css$/,
        include,
        exclude: /node_modules/,

        use: plugin.extract({
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ],
          fallback: "style-loader"
        }),
      }],
    },
    plugins: [plugin],
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: "file-loader",
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "happypack/loader",
      },
    ],
  },
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});
