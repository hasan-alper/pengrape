import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const typeOpts = document.querySelectorAll('input[name="type"]');
const parityOpts = document.querySelectorAll('input[name="parity"]');
const copyButton = document.querySelector("#copy-button");

button.addEventListener("click", () => {
	let selectedType;
	for (const typeOpt of typeOpts) {
		if (typeOpt.checked) {
			selectedType = typeOpt.value;
			break;
		}
	}
	let selectedParity;
	for (const parityOpt of parityOpts) {
		if (parityOpt.checked) {
			selectedParity = parityOpt.value;
			break;
		}
	}
	let minInput = parseInt(document.querySelector("#min-input").value);
	let maxInput = parseInt(document.querySelector("#max-input").value);
	const precision = parseInt(document.querySelector("#precision").value);

	if (minInput > maxInput) {
		maxInput = maxInput + minInput;
		minInput = maxInput - minInput;
		maxInput = maxInput - minInput;
	}

	document.querySelector("#min-input").value = minInput;
	document.querySelector("#max-input").value = maxInput;

	output.innerHTML = random.number({ min: minInput, max: maxInput, type: selectedType, precision: precision, parity: selectedParity });
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});
