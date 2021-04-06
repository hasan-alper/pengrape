module.exports.randomNumber = (req, res) => {
	res.render("utilities/randomNumber", { title: "Random Number", scriptRoute: "randomNumber" });
};

module.exports.randomColor = (req, res) => {
	res.render("utilities/randomColor", { title: "Random Color", scriptRoute: "randomColor" });
};

module.exports.randomPassword = (req, res) => {
	res.render("utilities/randomPassword", { title: "Random Password", scriptRoute: "randomPassword" });
};

module.exports.spinner = (req, res) => {
	res.render("utilities/spinner", { title: "Spinner", scriptRoute: "spinner" });
};

module.exports.diceRoller = (req, res) => {
	res.render("utilities/diceRoller", { title: "Dice Roller", scriptRoute: "diceRoller" });
};

module.exports.randomText = (req, res) => {
	res.render("utilities/randomText", { title: "Random Text", scriptRoute: "randomText" });
};
