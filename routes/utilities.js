const express = require("express");
const utilities = require("../controllers/utilities");

const router = express.Router();

router.get("/random-number", utilities.randomNumber);

router.get("/random-color", utilities.randomColor);

router.get("/random-password", utilities.randomPassword);

router.get("/spinner", utilities.spinner);

router.get("/dice-roller", utilities.diceRoller);

router.get("/random-text", utilities.randomText);

router.get("/random-date", utilities.randomDate);

module.exports = router;
