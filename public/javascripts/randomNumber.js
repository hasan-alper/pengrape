import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");

button.addEventListener("click", () => {
	const minInput = parseInt(document.querySelector("#min-input").value);
	const maxInput = parseInt(document.querySelector("#max-input").value);
	output.innerHTML = random.number({
		min: minInput || 0,
		max: maxInput || 100,
	});
});
