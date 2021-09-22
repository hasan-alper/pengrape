const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const utilitiesRoute = require("./routes/utilities");
const expressLayouts = require("express-ejs-layouts");

const port = process.env.PORT || 3000;

const app = express();

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/utilities", utilitiesRoute);

app.get("/", (req, res) => {
	res.render("home", {
		title: "Home - Pengrape",
		description: "Pengrape is a web service to generate anything random. It has a good number of utilities which has been designed to be lightweight, fast and easy to use.",
		keywords: "random, generate, number, color, palette, password, spinner, dice, text, date",
		scriptRoute: "home",
		layout: "layouts/boilerplate",
	});
});

app.get("/docs", (req, res) => {
	res.render("docs", {
		title: "Docs - Pengrape",
		description: "Pengrape Full Documentation. Explore the notes and examples to use Pengrape.",
		keywords: "random, docs, documentation",
		scriptRoute: "docs",
		layout: "layouts/boilerplate",
	});
});

app.listen(port, (req, res) => {
	console.log(`LISTENING ON PORT ${port}!`);
});
