import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const typeOpts = document.querySelectorAll('input[name="type"]');
const parityOpts = document.querySelectorAll('input[name="parity"]');
const copyButton = document.querySelector("#copy-button");
const integerButton = document.querySelector("#integer");
const noneButton = document.querySelector("#none");
const oddButton = document.querySelector("#odd");
const evenButton = document.querySelector("#even");
const decimalButton = document.querySelector("#decimal");
const precisionInput = document.querySelector("#precision");
const minInput = document.querySelector("#min-input");
const maxInput = document.querySelector("#max-input");

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
	let min = parseInt(minInput.value);
	let max = parseInt(maxInput.value);
	const precision = parseInt(precisionInput.value);

	if (min > max) {
		max = max + min;
		min = max - min;
		max = max - min;
	}

	document.querySelector("#min-input").value = min;
	document.querySelector("#max-input").value = max;
	precisionInput.value = precision;

	output.innerHTML = random.number({ min: min, max: max, type: selectedType, precision: precision, parity: selectedParity });
});

integerButton.addEventListener("click", () => {
	noneButton.disabled = false;
	oddButton.disabled = false;
	evenButton.disabled = false;
	precisionInput.disabled = true;
	precisionInput.value = 4;
	if (parseInt(minInput.value) !== parseInt(maxInput.value) && minInput.value && maxInput.value && minInput.value <= 9999999999 && maxInput.value <= 9999999999) {
		button.disabled = false;
	}
});

decimalButton.addEventListener("click", () => {
	noneButton.disabled = true;
	oddButton.disabled = true;
	evenButton.disabled = true;
	precisionInput.disabled = false;
	noneButton.checked = true;
	if (parseInt(minInput.value) !== parseInt(maxInput.value) && minInput.value && maxInput.value && minInput.value <= 9999999999 && maxInput.value <= 9999999999) {
		button.disabled = false;
	}
});

precisionInput.addEventListener("input", () => {
	if (precisionInput.value > 999 || precisionInput.value < 1) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

minInput.addEventListener("input", () => {
	if (parseInt(minInput.value) === parseInt(maxInput.value) || !minInput.value || minInput.value > 9999999999) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

maxInput.addEventListener("input", () => {
	if (parseInt(minInput.value) == parseInt(maxInput.value) || !maxInput.value || maxInput.value > 9999999999) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});
