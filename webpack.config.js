const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  entry: {
    app: './app/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
     new HtmlWebpackPlugin({
       title: 'Output Management',
       template: './app/index.html'
     }),
     new GoogleFontsPlugin({
			fonts: [
				{ family: "Source Sans Pro", variants: ["400", "200italic"]},
				{ family: "Roboto", variants: [ "400", "700italic" ] }
			]
		}),
     new ExtractTextPlugin('./app/main.css')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract(
            {
              fallback: "style-loader",
              use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }
          ]})
      },
    ]
  }
};
