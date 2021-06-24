require("../stylesheets/randomText.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const resultContent = document.querySelector("#result-content");
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

buttonCopy.addEventListener("click", () => {
	window.navigator.clipboard.writeText(resultContent.innerText);
});

buttonGenerate.addEventListener("click", () => {
	for (let type of radioTypes) {
		if (type.checked) {
			selected = type.value;
		}
	}

	let textLength = inputLength.value;

	if (radioLengthTypes[0].checked) textLength = null;

	resultContent.innerHTML = random.text({ type: selected, length: parseInt(textLength) });
});

radioLengthTypes[0].addEventListener("click", () => {
	fixedContent.style.display = "none";
	option11Content.style.borderBottom = "none";
});

radioLengthTypes[1].addEventListener("click", () => {
	fixedContent.style.display = "flex";
	option11Content.style.borderBottom = "1px solid #e1e4e8";
});
