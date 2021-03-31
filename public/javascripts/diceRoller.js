import { random } from "/static/javascripts/index.js";

const amountsInput = document.querySelector("#amounts");
const sidesInput = document.querySelector("#sides");
const output = document.querySelector("#output");
const totalOutput = document.querySelector("#total-output");
const button = document.querySelector("#button");
const totalButton = document.querySelector("#total-button");

button.addEventListener("click", () => {
	const results = random.dice({ notation: `${amountsInput.value}d${sidesInput.value}`, returnTotal: totalButton.checked ? true : false });
	output.innerHTML = results[0];
	totalOutput.innerHTML = results[1] || "-";
});
