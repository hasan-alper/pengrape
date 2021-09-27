require("../stylesheets/randomPassword.scss");

const random = require("pengrape");

const colorPrimary = "#e87477";
const colorBlack = "#24292e";
const colorDark = "#586069";
const colorGray = "#99a2ad";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const radioLengthType = document.querySelectorAll('input[name="length-type"]');

const fixedContent = document.querySelector("#fixed-content");
const inputLength = document.querySelector("#input-length");

const randomContent = document.querySelector("#random-content");
const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");

const charactersContent = document.querySelector("#option-2-1-content");
const buttonLowercase = document.querySelector("#button-lowercase");
const buttonUppercase = document.querySelector("#button-uppercase");
const buttonNumbers = document.querySelector("#button-numbers");
const buttonSymbols = document.querySelector("#button-symbols");
const symbolPoolContent = document.querySelector("#symbol-pool-content");

const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");

let inputSymbolPool = document.querySelector("#input-symbol-pool");
const buttonExcludeSimilar = document.querySelector("#button-exclude-similar");

let mode = "generate";
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	const minLength = +inputMin.value;
	const maxLength = +inputMax.value;
	const length = +inputLength.value;
	const lowercase = buttonLowercase.checked;
	const uppercase = buttonUppercase.checked;
	const number = buttonNumbers.checked;
	const symbol = buttonSymbols.checked;
	const symbolPool = inputSymbolPool.value;
	const excludeSimilar = buttonExcludeSimilar.checked;
	const construct = +inputQuantity.value;

	if (mode === "construct") {
		if (radioLengthType[1].checked) {
			constructedResults = random.password({ lowercase, uppercase, number, symbol, minLength, maxLength, symbolPool, excludeSimilar, construct });
		} else {
			constructedResults = random.password({ lowercase, uppercase, number, symbol, length, symbolPool, excludeSimilar, construct });
		}
		constructedResultsContent.innerHTML = "";
		constructor(constructedResults);
		return;
	}

	if (radioLengthType[1].checked) {
		resultContent.innerHTML = random.password({ lowercase, uppercase, number, symbol, minLength, maxLength, symbolPool, excludeSimilar });
	} else {
		resultContent.innerHTML = random.password({ lowercase, uppercase, number, symbol, length, symbolPool, excludeSimilar });
	}
});

buttonSymbols.addEventListener("click", () => {
	if (buttonSymbols.checked) {
		symbolPoolContent.style.display = "flex";
		charactersContent.style.borderBottom = "1px solid #e1e4e8";
	} else {
		symbolPoolContent.style.display = "none";
		charactersContent.style.borderBottom = "none";
	}
	inputSymbolPool.value = "~!@#$%&*-+=?/";
	validate();
});

radioLengthType[0].addEventListener("click", () => {
	fixedContent.style.display = "flex";
	randomContent.style.display = "none";
	inputMin.value = 16;
	inputMax.value = 24;
	validate();
});

radioLengthType[1].addEventListener("click", () => {
	fixedContent.style.display = "none";
	randomContent.style.display = "flex";
	inputLength.value = 20;
	validate();
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
	const minLength = +inputMin.value;
	const maxLength = +inputMax.value;
	const length = +inputLength.value;
	const lowercase = buttonLowercase.checked;
	const uppercase = buttonUppercase.checked;
	const number = buttonNumbers.checked;
	const symbol = buttonSymbols.checked;
	const symbolPool = inputSymbolPool.value;
	const construct = +inputQuantity.value;

	if (Number.isInteger(minLength) && 3 < minLength && minLength < 65) condition[0] = true;
	else condition[0] = false;
	if (Number.isInteger(maxLength) && 3 < maxLength && maxLength < 65) condition[1] = true;
	else condition[1] = false;
	if (minLength < maxLength) condition[2] = true;
	else condition[2] = false;
	if (Number.isInteger(length) && 3 < length && length < 65) condition[3] = true;
	else condition[3] = false;
	if (lowercase || uppercase || number || symbol) condition[4] = true;
	else condition[4] = false;
	if (symbolPool) condition[5] = true;
	else condition[5] = false;
	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[6] = true;
	else condition[6] = false;

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
		inputLength.style.color = colorPrimary;
		inputLength.style.borderColor = colorPrimary;
	} else {
		inputLength.style.color = colorDark;
		inputLength.style.borderColor = colorGray;
	}
	if (!conditions[4]) {
		document.querySelector("#option-2 .header").style.color = colorPrimary;
		document.querySelector("#option-2 .description").style.color = colorPrimary;
	} else {
		document.querySelector("#option-2 .header").style.color = colorBlack;
		document.querySelector("#option-2 .description").style.color = colorDark;
	}
	if (!conditions[5]) {
		inputSymbolPool.style.color = colorPrimary;
		inputSymbolPool.style.borderColor = colorPrimary;
	} else {
		inputSymbolPool.style.color = colorDark;
		inputSymbolPool.style.borderColor = colorGray;
	}
	if (!conditions[6]) {
		inputQuantity.style.color = colorPrimary;
		inputQuantity.style.borderColor = colorPrimary;
	} else {
		inputQuantity.style.color = colorDark;
		inputQuantity.style.borderColor = colorGray;
	}
};

inputMin.addEventListener("input", validate);
inputMax.addEventListener("input", validate);
inputLength.addEventListener("input", validate);
buttonLowercase.addEventListener("click", validate);
buttonUppercase.addEventListener("click", validate);
buttonNumbers.addEventListener("click", validate);
buttonSymbols.addEventListener("click", validate);
inputSymbolPool.addEventListener("input", validate);
inputQuantity.addEventListener("input", validate);
