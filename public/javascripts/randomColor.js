import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const hexButton = document.querySelector("#hex");
const rgbButton = document.querySelector("#rgb");
const hslButton = document.querySelector("#hsl");
const colorOpts = document.querySelectorAll('input[name="color"]');

button.addEventListener("click", () => {
	let index;
	colorOpts.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	const colorCodes = random.color({ type: "all" });
	output.innerHTML = colorCodes[index];
	output.style.backgroundColor = colorCodes[index];

	hexButton.addEventListener("click", () => {
		output.innerHTML = colorCodes[0];
		output.style.backgroundColor = colorCodes[0];
	});

	rgbButton.addEventListener("click", () => {
		output.innerHTML = colorCodes[1];
		output.style.backgroundColor = colorCodes[1];
	});

	hslButton.addEventListener("click", () => {
		output.innerHTML = colorCodes[2];
		output.style.backgroundColor = colorCodes[2];
	});
});
