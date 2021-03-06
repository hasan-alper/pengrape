require("../stylesheets/randomPassword.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const buttonGenerate = document.querySelector("#button-generate");
const fixedContent = document.querySelector("#fixed-content");
const randomContent = document.querySelector("#random-content");
const option21Content = document.querySelector("#option-2-1-content");
const symbolPoolContent = document.querySelector("#symbol-pool-content");
const buttonLowercase = document.querySelector("#button-lowercase");
const buttonUppercase = document.querySelector("#button-uppercase");
const buttonNumbers = document.querySelector("#button-numbers");
const buttonSymbols = document.querySelector("#button-symbols");
const inputLength = document.querySelector("#input-length");
const buttonCopy = document.querySelector("#button-copy");
const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");
const radioLengthType = document.querySelectorAll('input[name="length-type"]');
let inputSymbolPool = document.querySelector("#input-symbol-pool");
const buttonExcludeSimilar = document.querySelector("#button-exclude-similar");
let mode = "generate";
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	if (!inputSymbolPool.value) document.querySelector("#symbol-pool").value = "~!@#$%&*-+=?/";

	let min = +inputMin.value;
	let max = +inputMax.value;
	if (min > max) {
		max = max + min;
		min = max - min;
		max = max - min;
	}
	document.querySelector("#input-min").value = min;
	document.querySelector("#input-max").value = max;

	if (mode === "construct") {
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		if (radioLengthType[1].checked) {
			constructedResults = random.password({
				lowercase: buttonLowercase.checked,
				uppercase: buttonUppercase.checked,
				number: buttonNumbers.checked,
				symbol: buttonSymbols.checked,
				minLength: +inputMin.value,
				maxLength: +inputMax.value,
				symbolPool: inputSymbolPool.value,
				excludeSimilar: buttonExcludeSimilar.checked,
				construct: +inputQuantity.value,
			});
		} else {
			constructedResults = random.password({
				lowercase: buttonLowercase.checked,
				uppercase: buttonUppercase.checked,
				number: buttonNumbers.checked,
				symbol: buttonSymbols.checked,
				length: +inputLength.value,
				symbolPool: inputSymbolPool.value,
				excludeSimilar: buttonExcludeSimilar.checked,
				construct: +inputQuantity.value,
			});
		}
		construct(constructedResults);
		return;
	}

	if (radioLengthType[1].checked) {
		resultContent.innerHTML = random.password({
			lowercase: buttonLowercase.checked,
			uppercase: buttonUppercase.checked,
			number: buttonNumbers.checked,
			symbol: buttonSymbols.checked,
			minLength: +inputMin.value,
			maxLength: +inputMax.value,
			symbolPool: inputSymbolPool.value,
			excludeSimilar: buttonExcludeSimilar.checked,
		});
	} else {
		resultContent.innerHTML = random.password({
			lowercase: buttonLowercase.checked,
			uppercase: buttonUppercase.checked,
			number: buttonNumbers.checked,
			symbol: buttonSymbols.checked,
			length: +inputLength.value,
			symbolPool: inputSymbolPool.value,
			excludeSimilar: buttonExcludeSimilar.checked,
		});
	}
});

inputLength.addEventListener("input", () => {
	if (inputLength.value > 64 || inputLength.value < 4) {
		buttonGenerate.disabled = true;
	} else {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	}
});

inputLength.addEventListener("change", () => {
	if (inputLength.value > 64) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputLength.value = 64;
	} else if (inputLength.value < 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputLength.value = 4;
	} else if (inputLength.value <= 64 || inputLength.value >= 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = true;
	}
});

inputMin.addEventListener("input", () => {
	if (parseInt(inputMin.value) === parseInt(inputMax.value) || !inputMin.value || inputMin.value > 64 || inputMin.value < 4) {
		buttonGenerate.disabled = true;
	} else {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	}
});

inputMax.addEventListener("input", () => {
	if (parseInt(inputMin.value) == parseInt(inputMax.value) || !inputMax.value || inputMax.value > 64 || inputMax.value < 4) {
		buttonGenerate.disabled = true;
	} else {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	}
});

inputMin.addEventListener("change", () => {
	if (inputMin.value > 64) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputMin.value = 63;
	} else if (inputMin.value < 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputMin.value = 4;
	} else if (inputMin.value <= 64 || inputMin.value >= 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = true;
	}
	if (parseInt(inputMin.value) == parseInt(inputMax.value)) {
		buttonGenerate.disabled = true;
	}
});

inputMax.addEventListener("change", () => {
	if (inputMax.value > 64) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputMax.value = 64;
	} else if (inputMax.value < 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
		inputMax.value = 5;
	} else if (inputMax.value <= 64 || inputMax.value >= 4) {
		if (buttonLowercase.checked || buttonUppercase.checked || buttonNumbers.checked || buttonSymbols.checked) {
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = true;
	}
	if (parseInt(inputMin.value) == parseInt(inputMax.value)) {
		buttonGenerate.disabled = true;
	}
});

buttonLowercase.addEventListener("click", () => {
	if ((!buttonLowercase.checked && !buttonUppercase.checked && !buttonNumbers.checked && !buttonSymbols.checked && inputLength.value <= 64 && inputLength.value >= 4) || inputMin.value === inputMax.value) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonUppercase.addEventListener("click", () => {
	if ((!buttonLowercase.checked && !buttonUppercase.checked && !buttonNumbers.checked && !buttonSymbols.checked && inputLength.value <= 64 && inputLength.value >= 4) || inputMin.value === inputMax.value) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonNumbers.addEventListener("click", () => {
	if ((!buttonLowercase.checked && !buttonUppercase.checked && !buttonNumbers.checked && !buttonSymbols.checked && inputLength.value <= 64 && inputLength.value >= 4) || inputMin.value === inputMax.value) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonSymbols.addEventListener("click", () => {
	if ((!buttonLowercase.checked && !buttonUppercase.checked && !buttonNumbers.checked && !buttonSymbols.checked && inputLength.value <= 64 && inputLength.value >= 4) || inputMin.value === inputMax.value) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
	if (buttonSymbols.checked) {
		symbolPoolContent.style.display = "flex";
		option21Content.style.borderBottom = "1px solid #e1e4e8";
	} else {
		symbolPoolContent.style.display = "none";
		option21Content.style.borderBottom = "none";
	}
});

inputSymbolPool.addEventListener("change", () => {
	if (!inputSymbolPool.value) document.querySelector("#symbol-pool").value = "~!@#$%&*-+=?/";
});

radioLengthType[0].addEventListener("click", () => {
	fixedContent.style.display = "flex";
	randomContent.style.display = "none";
});

radioLengthType[1].addEventListener("click", () => {
	fixedContent.style.display = "none";
	randomContent.style.display = "flex";
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
