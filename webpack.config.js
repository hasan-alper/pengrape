const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		home: "./public/javascripts/home.js",
		docs: "./public/javascripts/docs.js",
		randomNumber: "./public/javascripts/randomNumber.js",
		randomColor: "./public/javascripts/randomColor.js",
		randomPassword: "./public/javascripts/randomPassword.js",
		spinner: "./public/javascripts/spinner.js",
		diceRoller: "./public/javascripts/diceRoller.js",
		randomText: "./public/javascripts/randomText.js",
	},
	output: {
		filename: "javascripts/[name].js",
		path: path.resolve(__dirname, "public/dist"),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin({ filename: "stylesheets/[name].css" }), new OptimizeCssAssetsPlugin()],
};
