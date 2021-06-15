require("../stylesheets/randomPassword.scss");

const random = require("pengrape");

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const length = document.querySelector("#length");
const copyButton = document.querySelector("#copy-button");
const minLength = document.querySelector("#min");
const maxLength = document.querySelector("#max");
const randomLengthButton = document.querySelector("#random-length-button");
const lengthDiv = document.querySelector("#length-div");
const randomLengthDiv = document.querySelector("#random-length-div");
let symbolPool = document.querySelector("#symbol-pool");
const excludeSimilar = document.querySelector("#exclude-similar");

button.addEventListener("click", () => {
	if (!symbolPool.value) document.querySelector("#symbol-pool").value = "~!@#$%&*-+=?/";

	let min = +minLength.value;
	let max = +maxLength.value;
	if (min > max) {
		max = max + min;
		min = max - min;
		max = max - min;
	}
	document.querySelector("#min").value = min;
	document.querySelector("#max").value = max;
	if (randomLengthButton.checked) {
		output.innerHTML = random.password({
			lowercase: lowercase.checked,
			uppercase: uppercase.checked,
			number: number.checked,
			symbol: symbol.checked,
			minLength: +minLength.value,
			maxLength: +maxLength.value,
			symbolPool: symbolPool.value,
			excludeSimilar: excludeSimilar.checked,
		});
	} else {
		output.innerHTML = random.password({
			lowercase: lowercase.checked,
			uppercase: uppercase.checked,
			number: number.checked,
			symbol: symbol.checked,
			length: +length.value,
			symbolPool: symbolPool.value,
			excludeSimilar: excludeSimilar.checked,
		});
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

randomLengthButton.addEventListener("click", () => {
	if (randomLengthButton.checked) {
		lengthDiv.style.display = "none";
		randomLengthDiv.style.display = "flex";
		length.value = 20;
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	} else {
		minLength.value = 16;
		maxLength.value = 24;
		lengthDiv.style.display = "flex";
		randomLengthDiv.style.display = "none";
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	}
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

minLength.addEventListener("input", () => {
	if (parseInt(minLength.value) === parseInt(maxLength.value) || !minLength.value || minLength.value > 64 || minLength.value < 4) {
		button.disabled = true;
	} else {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	}
});

maxLength.addEventListener("input", () => {
	if (parseInt(minLength.value) == parseInt(maxLength.value) || !maxLength.value || maxLength.value > 64 || maxLength.value < 4) {
		button.disabled = true;
	} else {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	}
});

minLength.addEventListener("change", () => {
	if (minLength.value > 64) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		minLength.value = 63;
	} else if (minLength.value < 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		minLength.value = 4;
	} else if (minLength.value <= 64 || minLength.value >= 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	} else {
		button.disabled = true;
	}
	if (parseInt(minLength.value) == parseInt(maxLength.value)) {
		button.disabled = true;
	}
});

maxLength.addEventListener("change", () => {
	if (maxLength.value > 64) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		maxLength.value = 64;
	} else if (maxLength.value < 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
		maxLength.value = 5;
	} else if (maxLength.value <= 64 || maxLength.value >= 4) {
		if (lowercase.checked || uppercase.checked || number.checked || symbol.checked) {
			button.disabled = false;
		}
	} else {
		button.disabled = true;
	}
	if (parseInt(minLength.value) == parseInt(maxLength.value)) {
		button.disabled = true;
	}
});

lowercase.addEventListener("click", () => {
	if ((!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) || minLength.value === maxLength.value) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

uppercase.addEventListener("click", () => {
	if ((!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) || minLength.value === maxLength.value) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

number.addEventListener("click", () => {
	if ((!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) || minLength.value === maxLength.value) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

symbol.addEventListener("click", () => {
	if ((!lowercase.checked && !uppercase.checked && !number.checked && !symbol.checked && length.value <= 64 && length.value >= 4) || minLength.value === maxLength.value) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
	if (symbol.checked) symbolPool.parentElement.style.display = "flex";
	else symbolPool.parentElement.style.display = "none";
});

symbolPool.addEventListener("change", () => {
	if (!symbolPool.value) document.querySelector("#symbol-pool").value = "~!@#$%&*-+=?/";
});
