const random = require("pengrape");

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const length = document.querySelector("#length");
const copyButton = document.querySelector("#copy-button");

button.addEventListener("click", () => {
	output.innerHTML = random.password({ lowercase: lowercase.checked, uppercase: uppercase.checked, number: number.checked, symbol: symbol.checked, length: parseInt(length.value) });
	length.value = parseInt(length.value);
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

length.addEventListener("input", () => {
	if (length.value > 64 || length.value < 4) {
		button.disabled = true;
	} else {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	}
});

length.addEventListener("change", () => {
	if (length.value > 64) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		length.value = 64;
	} else if (length.value < 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		length.value = 4;
	} else if (length.value <= 64 || length.value >= 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	} else {
		button.disabled = true;
	}
});

lowercase.addEventListener("click", () => {
	if (!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

uppercase.addEventListener("click", () => {
	if (!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

number.addEventListener("click", () => {
	if (!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

symbol.addEventListener("click", () => {
	if (!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});
