require("../stylesheets/randomNumber.scss");

const random = require("pengrape");

const colorPrimary = "#eb4763";
const colorBlack = "#202020";
const colorDark = "#505050";
const colorGray = "#a3a3a3";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const radioType = document.querySelectorAll('input[name="type"]');
const buttonInteger = document.querySelector("#button-integer");
const buttonDecimal = document.querySelector("#button-decimal");

const parityContent = document.querySelector("#parity-content");
const radioParity = document.querySelectorAll('input[name="parity"]');

const precisionContent = document.querySelector("#precision-content");
const inputPrecision = document.querySelector("#input-precision");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");

const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");

let mode = "generate";
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	let type;
	for (const typeOpt of radioType) {
		if (typeOpt.checked) {
			type = typeOpt.value;
			break;
		}
	}

	let parity;
	for (const parityOpt of radioParity) {
		if (parityOpt.checked) {
			parity = parityOpt.value;
			break;
		}
	}

	const min = +inputMin.value;
	const max = +inputMax.value;
	const precision = +inputPrecision.value;
	const construct = +inputQuantity.value;

	switch (mode) {
		case "generate":
			resultContent.innerHTML = random.number({ min, max, type, precision, parity });
			break;
		case "construct":
			constructedResultsContent.innerHTML = "";
			constructedResults = random.number({ min, max, type, precision, parity, construct });
			constructor(constructedResults);
			break;
	}
});

buttonInteger.addEventListener("click", () => {
	parityContent.style.display = "flex";
	precisionContent.style.display = "none";
	inputPrecision.value = 4;
	validate();
});

buttonDecimal.addEventListener("click", () => {
	parityContent.style.display = "none";
	precisionContent.style.display = "flex";
});

buttonTabsGenerate.addEventListener("click", () => {
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "flex";
	constructContent.style.display = "none";
	inputQuantity.value = 4;
	validate();
});

buttonTabsConstruct.addEventListener("click", () => {
	mode = "construct";
	buttonGenerate.innerText = "Construct";
	resultContent.style.display = "none";
	constructContent.style.display = "flex";
});

buttonCopy.addEventListener("click", () => {
	switch (mode) {
		case "generate":
			window.navigator.clipboard.writeText(resultContent.innerText);
			break;
		case "construct":
			window.navigator.clipboard.writeText(constructedResults);
			break;
	}
});

const constructor = (results) => {
	for (let result of results) {
		const allResults = document.createElement("div");
		allResults.className = "col";
		allResults.innerHTML = result;
		constructedResultsContent.appendChild(allResults);
	}
};

const condition = () => {
	let condition = [];
	const min = +inputMin.value;
	const max = +inputMax.value;
	const precision = +inputPrecision.value;
	const construct = +inputQuantity.value;

	if (inputMin.value && Number.isInteger(min) && Math.abs(min) < 1000000000) condition[0] = true;
	else condition[0] = false;
	if (inputMax.value && Number.isInteger(max) && Math.abs(max) < 1000000000) condition[1] = true;
	else condition[1] = false;
	if (min < max) condition[2] = true;
	else condition[2] = false;
	if (Number.isInteger(precision) && 0 < precision && precision < 1000) condition[3] = true;
	else condition[3] = false;
	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[4] = true;
	else condition[4] = false;

	return condition;
};

const validate = () => {
	const conditions = condition();
	if (conditions.includes(false)) buttonGenerate.disabled = true;
	else buttonGenerate.disabled = false;
	if (!conditions[0]) {
		inputMin.style.color = colorPrimary;
		inputMin.style.borderColor = colorPrimary;
	} else {
		inputMin.style.color = colorDark;
		inputMin.style.borderColor = colorGray;
	}
	if (!conditions[1]) {
		inputMax.style.color = colorPrimary;
		inputMax.style.borderColor = colorPrimary;
	} else {
		inputMax.style.color = colorDark;
		inputMax.style.borderColor = colorGray;
	}
	if (!conditions[2]) {
		inputMin.style.color = colorPrimary;
		inputMin.style.borderColor = colorPrimary;
		inputMax.style.color = colorPrimary;
		inputMax.style.borderColor = colorPrimary;
	} else {
		if (conditions[0]) {
			inputMin.style.color = colorDark;
			inputMin.style.borderColor = colorGray;
		}
		if (conditions[1]) {
			inputMax.style.color = colorDark;
			inputMax.style.borderColor = colorGray;
		}
	}
	if (!conditions[3]) {
		inputPrecision.style.color = colorPrimary;
		inputPrecision.style.borderColor = colorPrimary;
	} else {
		inputPrecision.style.color = colorDark;
		inputPrecision.style.borderColor = colorGray;
	}
	if (!conditions[4]) {
		inputQuantity.style.color = colorPrimary;
		inputQuantity.style.borderColor = colorPrimary;
	} else {
		inputQuantity.style.color = colorDark;
		inputQuantity.style.borderColor = colorGray;
	}
};

inputMin.addEventListener("input", validate);
inputMax.addEventListener("input", validate);
inputPrecision.addEventListener("input", validate);
inputQuantity.addEventListener("input", validate);
