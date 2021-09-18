module.exports.randomNumber = (req, res) => {
	res.render("utilities/randomNumber", { title: "Random Number - Pengrape", scriptRoute: "randomNumber", layout: "layouts/utilities" });
};

module.exports.randomColor = (req, res) => {
	res.render("utilities/randomColor", { title: "Random Color - Pengrape", scriptRoute: "randomColor", layout: "layouts/utilities" });
};

module.exports.randomPalette = (req, res) => {
	res.render("utilities/randomPalette", { title: "Random Palette - Pengrape", scriptRoute: "randomPalette", layout: "layouts/utilities" });
};

module.exports.randomPassword = (req, res) => {
	res.render("utilities/randomPassword", { title: "Random Password - Pengrape", scriptRoute: "randomPassword", layout: "layouts/utilities" });
};

module.exports.spinner = (req, res) => {
	res.render("utilities/spinner", { title: "Spinner - Pengrape", scriptRoute: "spinner", layout: "layouts/utilities" });
};

module.exports.diceRoller = (req, res) => {
	res.render("utilities/diceRoller", { title: "Dice Roller - Pengrape", scriptRoute: "diceRoller", layout: "layouts/utilities" });
};

module.exports.randomText = (req, res) => {
	res.render("utilities/randomText", { title: "Random Text - Pengrape", scriptRoute: "randomText", layout: "layouts/utilities" });
};

module.exports.randomDate = (req, res) => {
	res.render("utilities/randomDate", { title: "Random Date - Pengrape", scriptRoute: "randomDate", layout: "layouts/utilities" });
};
