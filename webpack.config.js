const path = require("path");

module.exports = {
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
		filename: "[name].js",
		path: path.resolve(__dirname, "public/dist/javascripts"),
	},
};
