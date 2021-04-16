import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const unitOutput = document.querySelector("#unit-output");
const lengthInput = document.querySelector("#length-input");
const types = document.querySelectorAll('input[name="type"]');
const letterButton = document.querySelector("#letter");
const syllableButton = document.querySelector("#syllable");
const wordButton = document.querySelector("#word");
const sentenceButton = document.querySelector("#sentence");
const paragraphButton = document.querySelector("#paragraph");
const copyButton = document.querySelector("#copy-button");
let selected;

lengthInput.addEventListener("input", () => {
	if (syllableButton.checked) {
		if (lengthInput.value > 4 || lengthInput.value < 2) {
			button.disabled = true;
		} else {
			button.disabled = false;
		}
	} else {
		if (lengthInput.value > 12 || lengthInput.value < 2) {
			button.disabled = true;
		} else {
			button.disabled = false;
		}
	}
});

letterButton.addEventListener("click", () => {
	unitOutput.innerHTML = "";
	lengthInput.disabled = true;
	button.disabled = false;
	lengthInput.value = "";
});

syllableButton.addEventListener("click", () => {
	unitOutput.innerHTML = "letters";
	lengthInput.disabled = false;
	if (lengthInput.value > 4 || lengthInput.value < 2) {
		if (lengthInput.value) {
			lengthInput.value = 4;
			button.disabled = false;
		}
	} else {
		button.disabled = false;
	}
});

wordButton.addEventListener("click", () => {
	unitOutput.innerHTML = "letters";
	lengthInput.disabled = false;
	if (lengthInput.value > 12 || lengthInput.value < 2) {
		if (lengthInput.value) {
			lengthInput.value = 4;
			button.disabled = false;
		}
	} else {
		button.disabled = false;
	}
});

sentenceButton.addEventListener("click", () => {
	unitOutput.innerHTML = "words";
	lengthInput.disabled = false;
	if (lengthInput.value > 12 || lengthInput.value < 2) {
		if (lengthInput.value) {
			lengthInput.value = 4;
			button.disabled = false;
		}
	} else {
		button.disabled = false;
	}
});

paragraphButton.addEventListener("click", () => {
	unitOutput.innerHTML = "sentences";
	lengthInput.disabled = false;
	if (lengthInput.value > 12 || lengthInput.value < 2) {
		if (lengthInput.value) {
			lengthInput.value = 4;
			button.disabled = false;
		}
	} else {
		button.disabled = false;
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

button.addEventListener("click", () => {
	for (let type of types) {
		if (type.checked) {
			selected = type.id;
		}
	}
	output.innerHTML = random.text({ type: selected, length: parseInt(lengthInput.value) });
});
