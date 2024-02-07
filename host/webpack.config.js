const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		clean: true,
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
	devServer: {
		port: 8080,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new ModuleFederationPlugin({
			remotes: {
				editorMFE: "editor@http://localhost:8081/remoteEntry.js",
			},
			shared: {
				...deps,
				react: {
					eager: true,
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					eager: true,
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
	],
};
