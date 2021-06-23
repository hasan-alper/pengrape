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
	res.render("home", { title: "Home - Pengrape", scriptRoute: "home", layout: "layouts/boilerplate" });
});

app.get("/docs", (req, res) => {
	res.render("docs", { title: "Docs - Pengrape", scriptRoute: "docs", layout: "layouts/boilerplate" });
});

app.listen(port, (req, res) => {
	console.log(`LISTENING ON PORT ${port}!`);
});
