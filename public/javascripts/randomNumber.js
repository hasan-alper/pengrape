require("../stylesheets/randomNumber.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const parityContent = document.querySelector("#parity-content");
const precisionContent = document.querySelector("#precision-content");
const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");
const buttonInteger = document.querySelector("#button-integer");
const radioParity = document.querySelectorAll('input[name="parity"]');
const radioType = document.querySelectorAll('input[name="type"]');
const buttonDecimal = document.querySelector("#button-decimal");
const inputPrecision = document.querySelector("#input-precision");
let mode = "generate";
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	let selectedType;
	for (const typeOpt of radioType) {
		if (typeOpt.checked) {
			selectedType = typeOpt.value;
			break;
		}
	}
	let selectedParity;
	for (const parityOpt of radioParity) {
		if (parityOpt.checked) {
			selectedParity = parityOpt.value;
			break;
		}
	}
	let min = parseInt(inputMin.value);
	let max = parseInt(inputMax.value);
	const precision = parseInt(inputPrecision.value);

	if (min > max) {
		max = max + min;
		min = max - min;
		max = max - min;
	}

	document.querySelector("#input-min").value = min;
	document.querySelector("#input-max").value = max;
	inputPrecision.value = precision;

	if (mode === "generate") resultContent.innerHTML = random.number({ min: min, max: max, type: selectedType, precision: precision, parity: selectedParity });
	else if (mode === "construct") {
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		constructedResults = random.number({ min: min, max: max, type: selectedType, precision: precision, parity: selectedParity, construct: +inputQuantity.value });
		construct(constructedResults);
	}
});

buttonInteger.addEventListener("click", () => {
	parityContent.style.display = "flex";
	precisionContent.style.display = "none";
	if (parseInt(inputMin.value) !== parseInt(inputMax.value) && inputMin.value && inputMax.value && inputMin.value <= 9999999999 && inputMax.value <= 9999999999) {
		buttonGenerate.disabled = false;
	}
});

buttonDecimal.addEventListener("click", () => {
	parityContent.style.display = "none";
	precisionContent.style.display = "flex";
	if (parseInt(inputMin.value) !== parseInt(inputMax.value) && inputMin.value && inputMax.value && inputMin.value <= 9999999999 && inputMax.value <= 9999999999) {
		buttonGenerate.disabled = false;
	}
});

inputPrecision.addEventListener("input", () => {
	if (inputPrecision.value > 999 || inputPrecision.value < 1) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputMin.addEventListener("input", () => {
	if (parseInt(inputMin.value) === parseInt(inputMax.value) || !inputMin.value || inputMin.value > 9999999999) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputMax.addEventListener("input", () => {
	if (parseInt(inputMin.value) == parseInt(inputMax.value) || !inputMax.value || inputMax.value > 9999999999) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonCopy.addEventListener("click", () => {
	if (mode === "generate") window.navigator.clipboard.writeText(resultContent.innerText);
	else if (mode === "construct") window.navigator.clipboard.writeText(constructedResults);
});

buttonTabsGenerate.addEventListener("click", () => {
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "flex";
	constructContent.style.display = "none";
});

buttonTabsConstruct.addEventListener("click", () => {
	mode = "construct";
	buttonGenerate.innerText = "Construct";
	resultContent.style.display = "none";
	constructContent.style.display = "flex";
});

const construct = (results) => {
	for (let result of results) {
		const allResults = document.createElement("div");
		allResults.className = "col";
		allResults.innerHTML = result;
		constructedResultsContent.appendChild(allResults);
	}
};

const deleteResults = () => {
	constructedResultsContent.innerHTML = "";
};
