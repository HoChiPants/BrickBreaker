const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		app: [
			'babel-polyfill', 
			'react-hot-loader/patch', 
			'./index.tsx',
			'./assets/styles/main.scss'
		],
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: 'body',
		}),
	],
	cache: true,
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src'],
					},
				},
			},
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
      {
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/,
      },
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
};
