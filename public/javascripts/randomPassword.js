import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const length = document.querySelector("#length");
const copyButton = document.querySelector("#copy-button");

button.addEventListener("click", () => {
	output.innerHTML = random.password({ lowercase: lowercase.checked, uppercase: uppercase.checked, number: number.checked, symbol: symbol.checked, length: length.value });
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});
