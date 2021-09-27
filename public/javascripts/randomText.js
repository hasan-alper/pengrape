require("../stylesheets/randomText.scss");

const random = require("pengrape");

const colorPrimary = "#eb4763";
const colorBlack = "#202020";
const colorDark = "#505050";
const colorGray = "#a3a3a3";
const colorBorder = "#e1e1e1";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const sectionLength = document.querySelector("#option-1-1-content");
const radioLengthTypes = document.querySelectorAll('input[name="length-type"]');

const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const fixedContent = document.querySelector("#fixed-content");
const outputUnit = document.querySelector("#output-unit");
const inputLength = document.querySelector("#input-length");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");

const radioTypes = document.querySelectorAll('input[name="type"]');
const buttonLetter = document.querySelector("#button-letter");
const buttonSyllable = document.querySelector("#button-syllable");
const buttonWord = document.querySelector("#button-word");
const buttonSentence = document.querySelector("#button-sentence");
const buttonParagraph = document.querySelector("#button-paragraph");

let mode = "generate";
let constructedResults = [];

buttonWord.addEventListener("click", () => {
	outputUnit.innerHTML = "letters";
});

buttonSentence.addEventListener("click", () => {
	outputUnit.innerHTML = "words";
});

buttonParagraph.addEventListener("click", () => {
	outputUnit.innerHTML = "sentences";
});

buttonGenerate.addEventListener("click", () => {
	let type;
	for (let radioType of radioTypes) {
		if (radioType.checked) {
			type = radioType.value;
		}
	}

	let length = +inputLength.value;
	const construct = +inputQuantity.value;

	if (radioLengthTypes[0].checked) length = undefined;

	switch (mode) {
		case "generate":
			resultContent.innerHTML = random.text({ type, length });
			break;
		case "construct":
			constructedResultsContent.innerHTML = "";
			constructedResults = random.text({ type, length, construct });
			constructor(constructedResults);
			break;
	}
});

radioLengthTypes[0].addEventListener("click", () => {
	buttonLetter.disabled = false;
	buttonSyllable.disabled = false;
	inputLength.value = 6;
	fixedContent.style.display = "none";
	sectionLength.style.borderBottom = "none";
	validate();
});

radioLengthTypes[1].addEventListener("click", () => {
	if (buttonLetter.checked || buttonSyllable.checked) buttonWord.checked = true;
	buttonLetter.disabled = true;
	buttonSyllable.disabled = true;
	fixedContent.style.display = "flex";
	sectionLength.style.borderBottom = `1px solid ${colorBorder}`;
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
	const length = +inputLength.value;
	const construct = +inputQuantity.value;

	if (radioLengthTypes[0].checked || (Number.isInteger(length) && 1 < length && length < 13)) condition[0] = true;
	else condition[0] = false;
	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[1] = true;
	else condition[1] = false;

	return condition;
};

const validate = () => {
	const conditions = condition();
	if (conditions.includes(false)) buttonGenerate.disabled = true;
	else buttonGenerate.disabled = false;
	if (!conditions[0]) {
		inputLength.style.color = colorPrimary;
		inputLength.style.borderColor = colorPrimary;
	} else {
		inputLength.style.color = colorDark;
		inputLength.style.borderColor = colorGray;
	}
	if (!conditions[1]) {
		inputQuantity.style.color = colorPrimary;
		inputQuantity.style.borderColor = colorPrimary;
	} else {
		inputQuantity.style.color = colorDark;
		inputQuantity.style.borderColor = colorGray;
	}
};

inputQuantity.addEventListener("input", validate);
inputLength.addEventListener("input", validate);
