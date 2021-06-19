require("../stylesheets/randomDate.scss");

const random = require("pengrape");

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const copyButton = document.querySelector("#copy-button");
const startYearInput = document.querySelector("#start-year-input");
const startMonthInput = document.querySelector("#start-month-input");
const startDayInput = document.querySelector("#start-day-input");
const endYearInput = document.querySelector("#end-year-input");
const endMonthInput = document.querySelector("#end-month-input");
const endDayInput = document.querySelector("#end-day-input");
const customFormatInput = document.querySelector("#custom-format-input");

button.addEventListener("click", () => {
	const dateStart = [+startYearInput.value, +startMonthInput.value, +startDayInput.value];
	const dateEnd = [+endYearInput.value, +endMonthInput.value, +endDayInput.value];
	const format = customFormatInput.value ? customFormatInput.value : "yyyy-mm-dd";
	output.innerHTML = random.date({ dateStart: dateStart, dateEnd: dateEnd, format: format });
});

startYearInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

startMonthInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

startDayInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

endYearInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

endMonthInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

endDayInput.addEventListener("input", () => {
	if (condition().includes(false)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

function condition() {
	let condition = [];
	const dateStart = [+startYearInput.value, +startMonthInput.value, +startDayInput.value];
	const dateEnd = [+endYearInput.value, +endMonthInput.value, +endDayInput.value];
	const test = random.date({ dateStart: dateStart, dateEnd: dateEnd });
	if (!startYearInput.value || startYearInput.value > 3000 || startYearInput.value < 1000) condition[0] = false;
	else condition[0] = true;
	if (!startMonthInput.value || startMonthInput.value > 12 || startMonthInput.value < 1) condition[1] = false;
	else condition[1] = true;
	if (!startDayInput.value || startDayInput.value > 31 || startDayInput.value < 1) condition[2] = false;
	else condition[2] = true;
	if (!endYearInput.value || endYearInput.value > 3000 || endYearInput.value < 1000) condition[3] = false;
	else condition[3] = true;
	if (!endMonthInput.value || endMonthInput.value > 12 || endMonthInput.value < 1) condition[4] = false;
	else condition[4] = true;
	if (!endDayInput.value || endDayInput.value > 31 || endDayInput.value < 1) condition[5] = false;
	else condition[5] = true;
	if (test.includes("Invalid")) condition[6] = false;
	else condition[6] = true;
	return condition;
}
