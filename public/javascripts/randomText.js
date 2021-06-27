require("../stylesheets/randomText.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const buttonGenerate = document.querySelector("#button-generate");
const fixedContent = document.querySelector("#fixed-content");
const option11Content = document.querySelector("#option-1-1-content");
const outputUnit = document.querySelector("#output-unit");
const inputLength = document.querySelector("#input-length");
const radioTypes = document.querySelectorAll('input[name="type"]');
const radioLengthTypes = document.querySelectorAll('input[name="length-type"]');
const buttonLetter = document.querySelector("#button-letter");
const buttonSyllable = document.querySelector("#button-syllable");
const buttonWord = document.querySelector("#button-word");
const buttonSentence = document.querySelector("#button-sentence");
const buttonParagraph = document.querySelector("#button-paragraph");
const buttonCopy = document.querySelector("#button-copy");
let selected;
let mode = "generate";
let constructedResults = [];

inputLength.addEventListener("input", () => {
	if (buttonSyllable.checked) {
		if (inputLength.value > 4 || inputLength.value < 2) {
			buttonGenerate.disabled = true;
		} else {
			buttonGenerate.disabled = false;
		}
	} else {
		if (inputLength.value > 12 || inputLength.value < 2) {
			buttonGenerate.disabled = true;
		} else {
			buttonGenerate.disabled = false;
		}
	}
});

buttonLetter.addEventListener("click", () => {
	outputUnit.innerHTML = "";
	inputLength.disabled = true;
	buttonGenerate.disabled = false;
	inputLength.value = "";
});

buttonSyllable.addEventListener("click", () => {
	outputUnit.innerHTML = "";
	inputLength.disabled = true;
	buttonGenerate.disabled = false;
	inputLength.value = "";
});

buttonWord.addEventListener("click", () => {
	outputUnit.innerHTML = "letters";
	inputLength.disabled = false;
	if (inputLength.value > 12 || inputLength.value < 2) {
		if (inputLength.value) {
			inputLength.value = 4;
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonSentence.addEventListener("click", () => {
	outputUnit.innerHTML = "words";
	inputLength.disabled = false;
	if (inputLength.value > 12 || inputLength.value < 2) {
		if (inputLength.value) {
			inputLength.value = 4;
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonParagraph.addEventListener("click", () => {
	outputUnit.innerHTML = "sentences";
	inputLength.disabled = false;
	if (inputLength.value > 12 || inputLength.value < 2) {
		if (inputLength.value) {
			inputLength.value = 4;
			buttonGenerate.disabled = false;
		}
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonGenerate.addEventListener("click", () => {
	for (let type of radioTypes) {
		if (type.checked) {
			selected = type.value;
		}
	}

	let textLength = inputLength.value;

	if (radioLengthTypes[0].checked) textLength = null;

	if (mode === "generate") resultContent.innerHTML = random.text({ type: selected, length: parseInt(textLength) });
	else if (mode === "construct") {
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		constructedResults = random.text({ type: selected, length: parseInt(textLength), construct: +inputQuantity.value });
		construct(constructedResults);
	}
});

radioLengthTypes[0].addEventListener("click", () => {
	fixedContent.style.display = "none";
	option11Content.style.borderBottom = "none";
});

radioLengthTypes[1].addEventListener("click", () => {
	fixedContent.style.display = "flex";
	option11Content.style.borderBottom = "1px solid #e1e4e8";
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
