module.exports.randomNumber = (req, res) => {
	res.render("utilities/randomNumber", {
		title: "Random Number - Pengrape",
		description: "Generate a random number between the two numbers that you chose.",
		keywords: "generate, random, number, integer, decimal, odd, even",
		scriptRoute: "randomNumber",
		layout: "layouts/utilities",
	});
};

module.exports.randomColor = (req, res) => {
	res.render("utilities/randomColor", {
		title: "Random Color - Pengrape",
		description: "Generate HEX, RGB or HSL color codes.",
		keywords: "generate, random, color, hex, rgb, hsl",
		scriptRoute: "randomColor",
		layout: "layouts/utilities",
	});
};

module.exports.randomPalette = (req, res) => {
	res.render("utilities/randomPalette", {
		title: "Random Palette - Pengrape",
		description: "Generate beautiful color combinations.",
		keywords: "generate, random, palette, colors, harmony",
		scriptRoute: "randomPalette",
		layout: "layouts/utilities",
	});
};

module.exports.randomPassword = (req, res) => {
	res.render("utilities/randomPassword", {
		title: "Random Password - Pengrape",
		description: "Generate secure passwords based on guidelines that you set.",
		keywords: "generate, random, password, secure",
		scriptRoute: "randomPassword",
		layout: "layouts/utilities",
	});
};

module.exports.spinner = (req, res) => {
	res.render("utilities/spinner", {
		title: "Spinner - Pengrape",
		description: "Enter names and spin the wheel to pick a random winner.",
		keywords: "generate, random, spinner, wheel, picker",
		scriptRoute: "spinner",
		layout: "layouts/utilities",
	});
};

module.exports.diceRoller = (req, res) => {
	res.render("utilities/diceRoller", {
		title: "Dice Roller - Pengrape",
		description: "Roll virtual dice.",
		keywords: "generate, random, dice, die, roll",
		scriptRoute: "diceRoller",
		layout: "layouts/utilities",
	});
};

module.exports.randomText = (req, res) => {
	res.render("utilities/randomText", {
		title: "Random Text - Pengrape",
		description: "Get a random placeholder text.",
		keywords: "generate, random, text, letter, syllable, word, sentence, paragraph",
		scriptRoute: "randomText",
		layout: "layouts/utilities",
	});
};

module.exports.randomDate = (req, res) => {
	res.render("utilities/randomDate", {
		title: "Random Date - Pengrape",
		description: "Generate a date between the two dates that you chose.",
		keywords: "generate, random, date, time",
		scriptRoute: "randomDate",
		layout: "layouts/utilities",
	});
};
