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
let selected;

letterButton.addEventListener("click", () => {
	unitOutput.innerHTML = "";
});

syllableButton.addEventListener("click", () => {
	unitOutput.innerHTML = "letters";
});

wordButton.addEventListener("click", () => {
	unitOutput.innerHTML = "letters";
});

sentenceButton.addEventListener("click", () => {
	unitOutput.innerHTML = "words";
});

paragraphButton.addEventListener("click", () => {
	unitOutput.innerHTML = "sentences";
});

button.addEventListener("click", () => {
	for (let type of types) {
		if (type.checked) {
			selected = type.id;
		}
	}
	output.innerHTML = random.text({ type: selected, length: parseInt(lengthInput.value) });
});
