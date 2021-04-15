import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const hexButton = document.querySelector("#hex");
const rgbButton = document.querySelector("#rgb");
const hslButton = document.querySelector("#hsl");
const colorOpts = document.querySelectorAll('input[name="format"]');
const copyButton = document.querySelector("#copy-button");
const undoButton = document.querySelector("#undo-button");
const resultsSection = document.querySelector("#results-div");
let index;

let history = [];

button.addEventListener("click", () => {
	colorOpts.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	const colorCodes = random.color({ format: "all" });

	let lightness = colorCodes[2].split(",")[2].slice(1, -2);

	if (lightness > 45) lightness = "black";
	else lightness = "white";

	colorCodes.push(lightness);

	output.style.color = colorCodes[3];
	output.innerHTML = colorCodes[index];
	resultsSection.style.backgroundColor = colorCodes[index];

	history.push(colorCodes);

	hexButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][0];
		resultsSection.style.backgroundColor = history[history.length - 1][0];
	});

	rgbButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][1];
		resultsSection.style.backgroundColor = history[history.length - 1][1];
	});

	hslButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][2];
		resultsSection.style.backgroundColor = history[history.length - 1][2];
	});

	if (history.length === 1) {
		undoButton.disabled = true;
	} else {
		undoButton.disabled = false;
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

undoButton.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}
	colorOpts.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			output.style.color = history[history.length - 1][3];
			output.innerHTML = history[history.length - 1][i];
			resultsSection.style.backgroundColor = history[history.length - 1][i];
			index = i;
		}
	});

	if (history.length === 1) {
		undoButton.disabled = true;
	}
});
