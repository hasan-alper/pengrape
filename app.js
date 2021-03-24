const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/utilities/random-number", (req, res) => {
	res.render("utilities/randomNumber");
});

app.get("/utilities/random-color", (req, res) => {
	res.render("utilities/randomColor");
});

app.listen(3000, (req, res) => {
	console.log("LISTENING ON PORT 3000!");
});
