import { EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, optimize } from 'webpack' // tslint:disable-line:max-line-length
import { config } from 'dotenv'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
config()
const dist = '../../demo'
const publicPath = '/'

export default (env: any) => {
	const port: number = env && env.HOST_PORT || 9009
	const analyzerPort: number = env && env.ANALYZER_PORT || 8886
	return {
		context: join(__dirname),
		entry: {
			demo: [
				'babel-polyfill',
				'react-hot-loader/patch',
				// activate HMR for React

				`webpack-dev-server/client?http://localhost:${port}`,
				// bundle the client for webpack-dev-server
				// and connect to the provided endpoint

				'webpack/hot/only-dev-server',
				// bundle the client for hot reloading
				// only- means to only hot reload for successful updates)

				'./index.tsx',
			],
		},
		output: {
			path: join(__dirname, dist),
			filename: '[name].js',
			publicPath
		},
		module: {
			rules: [
				{
					test: /\.(sass|scss|css)$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{ loader: 'resolve-url-loader' },
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg|jpg|json)$/i,
					exclude: /node_modules/,
					loader: 'file-loader'
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/i,
					exclude: /node_modules/,
					loader: 'file-loader'
				},
				{
					test: /\.(ico)$/i,
					exclude: /node_modules/,
					loader: 'file-loader?name=[name].[ext]'
				},
				{
					test: /\.ts(x?)$/,
					exclude: [/node_modules/],
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [
								['env', { modules: false, useBuiltIns: 'usage', targets: { browsers: ['last 2 major versions', 'ie 10'] } }],
								'react'
							],
							plugins: ['react-hot-loader/babel'],
							babelrc: false
						}
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								target: 'es6',
								module: 'es2015',
								jsx: 'preserve',
								sourceMap: true
							}
						}
					}],
				},
			],
		},
		plugins: [
			new HotModuleReplacementPlugin(),
			new NamedModulesPlugin(),
			new NoEmitOnErrorsPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.html',
				filename: 'index.html',
				inject: 'body',
			})
		],
		resolve: {
			extensions: ['.jsx', '.js', '.ts', '.tsx', '.scss'],
			alias: {

			}
		},
		devtool: 'source-map',
		devServer: {
			port,
			historyApiFallback: true,
			hot: true,
			contentBase: './demo',
		}
	}
}
