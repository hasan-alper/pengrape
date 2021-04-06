const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const utilitiesRoute = require("./routes/utilities");

const app = express();

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/utilities", utilitiesRoute);

app.get("/", (req, res) => {
	res.render("home", { title: "Home", scriptRoute: "home" });
});

app.listen(3000, (req, res) => {
	console.log("LISTENING ON PORT 3000!");
});
