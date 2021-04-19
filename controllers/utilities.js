module.exports.randomNumber = (req, res) => {
	res.render("utilities/randomNumber", { title: "Random Number - Pengrape", scriptRoute: "randomNumber" });
};

module.exports.randomColor = (req, res) => {
	res.render("utilities/randomColor", { title: "Random Color - Pengrape", scriptRoute: "randomColor" });
};

module.exports.randomPassword = (req, res) => {
	res.render("utilities/randomPassword", { title: "Random Password - Pengrape", scriptRoute: "randomPassword" });
};

module.exports.spinner = (req, res) => {
	res.render("utilities/spinner", { title: "Spinner - Pengrape", scriptRoute: "spinner" });
};

module.exports.diceRoller = (req, res) => {
	res.render("utilities/diceRoller", { title: "Dice Roller - Pengrape", scriptRoute: "diceRoller" });
};

module.exports.randomText = (req, res) => {
	res.render("utilities/randomText", { title: "Random Text - Pengrape", scriptRoute: "randomText" });
};
