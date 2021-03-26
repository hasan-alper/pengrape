import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const typeOpts = document.querySelectorAll('input[name="type"]');
const copyButton = document.querySelector("#copy-button");

button.addEventListener("click", () => {
	let selected;
	for (const typeOpt of typeOpts) {
		if (typeOpt.checked) {
			selected = typeOpt.value;
			break;
		}
	}
	const minInput = parseInt(document.querySelector("#min-input").value);
	const maxInput = parseInt(document.querySelector("#max-input").value);
	const precision = parseInt(document.querySelector("#precision").value);
	output.innerHTML = random.number({ min: minInput, max: maxInput, type: selected, precision: precision });
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});
