const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		home: "./public/javascripts/home.js",
		docs: "./public/javascripts/docs.js",
		layout: "./public/javascripts/layout.js",
		randomNumber: "./public/javascripts/randomNumber.js",
		randomColor: "./public/javascripts/randomColor.js",
		randomPalette: "./public/javascripts/randomPalette.js",
		randomPassword: "./public/javascripts/randomPassword.js",
		spinner: "./public/javascripts/spinner.js",
		diceRoller: "./public/javascripts/diceRoller.js",
		randomText: "./public/javascripts/randomText.js",
		randomDate: "./public/javascripts/randomDate.js",
		prism: "./public/javascripts/prism.js",
	},
	output: {
		filename: "javascripts/[name].js",
		path: path.resolve(__dirname, "public/dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin({ filename: "stylesheets/[name].css" })],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
