const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	entry: {
		home: "./public/javascripts/home.js",
		docs: "./public/javascripts/docs.js",
		layout: "./public/javascripts/layout.js",
		randomNumber: "./public/javascripts/randomNumber.js",
		randomColor: "./public/javascripts/randomColor.js",
		randomPassword: "./public/javascripts/randomPassword.js",
		spinner: "./public/javascripts/spinner.js",
		diceRoller: "./public/javascripts/diceRoller.js",
		randomText: "./public/javascripts/randomText.js",
		randomDate: "./public/javascripts/randomDate.js",
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
	plugins: [new MiniCssExtractPlugin({ filename: "stylesheets/[name].css" })],
};
