const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");

const app = express();

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("home", { title: "Home", scriptRoute: "home" });
});

app.get("/utilities/random-number", (req, res) => {
	res.render("utilities/randomNumber", { title: "Random Number", scriptRoute: "randomNumber" });
});

app.get("/utilities/random-color", (req, res) => {
	res.render("utilities/randomColor", { title: "Random Color", scriptRoute: "randomColor" });
});

app.get("/utilities/random-password", (req, res) => {
	res.render("utilities/randomPassword", { title: "Random Password", scriptRoute: "randomPassword" });
});

app.get("/utilities/spinner", (req, res) => {
	res.render("utilities/spinner", { title: "Spinner", scriptRoute: "spinner" });
});

app.get("/utilities/dice-roller", (req, res) => {
	res.render("utilities/diceRoller", { title: "Dice Roller", scriptRoute: "diceRoller" });
});

app.get("/utilities/random-text", (req, res) => {
	res.render("utilities/randomText", { title: "Random Text", scriptRoute: "randomText" });
});

app.listen(3000, (req, res) => {
	console.log("LISTENING ON PORT 3000!");
});
