const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(3000, (req, res) => {
	console.log("LISTENING ON PORT 3000!");
});
