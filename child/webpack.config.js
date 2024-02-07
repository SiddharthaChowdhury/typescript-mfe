const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const packageDependencies = require("./package.json").dependencies;

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		port: 8081,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			chunks: ["main"],
		}),
		new ModuleFederationPlugin({
			name: "editor",
			filename: "remoteEntry.js",
			exposes: {
				"./Editor": "./src/exposed.ts",
			},
			shared: {
				...packageDependencies,
				react: {
					eager: true,
					singleton: true,
					requiredVersion: packageDependencies.react,
				},
				"react-dom": {
					eager: true,
					singleton: true,
					requiredVersion: packageDependencies["react-dom"],
				},
			},
		}),
	],
};
