require("../stylesheets/randomDate.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const resultContent = document.querySelector("#result-content");
const buttonCopy = document.querySelector("#button-copy");
const inputStartYear = document.querySelector("#input-start-year");
const inputStartMonth = document.querySelector("#input-start-month");
const inputStartDay = document.querySelector("#input-start-day");
const inputEndYear = document.querySelector("#input-end-year");
const inputEndMonth = document.querySelector("#input-end-month");
const inputEndDay = document.querySelector("#input-end-day");
const inputCustomFormat = document.querySelector("#input-custom-format");

buttonGenerate.addEventListener("click", () => {
	const dateStart = [+inputStartYear.value, +inputStartMonth.value, +inputStartDay.value];
	const dateEnd = [+inputEndYear.value, +inputEndMonth.value, +inputEndDay.value];
	const format = inputCustomFormat.value ? inputCustomFormat.value : "yyyy-mm-dd";
	resultContent.innerHTML = random.date({ dateStart: dateStart, dateEnd: dateEnd, format: format });
});

inputStartYear.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputStartMonth.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputStartDay.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputEndYear.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputEndMonth.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

inputEndDay.addEventListener("input", () => {
	if (condition().includes(false)) {
		buttonGenerate.disabled = true;
	} else {
		buttonGenerate.disabled = false;
	}
});

buttonCopy.addEventListener("click", () => {
	window.navigator.clipboard.writeText(resultContent.innerText);
});

function condition() {
	let condition = [];
	const dateStart = [+inputStartYear.value, +inputStartMonth.value, +inputStartDay.value];
	const dateEnd = [+inputEndYear.value, +inputEndMonth.value, +inputEndDay.value];
	const test = random.date({ dateStart: dateStart, dateEnd: dateEnd });
	if (!inputStartYear.value || inputStartYear.value > 3000 || inputStartYear.value < 1000) condition[0] = false;
	else condition[0] = true;
	if (!inputStartMonth.value || inputStartMonth.value > 12 || inputStartMonth.value < 1) condition[1] = false;
	else condition[1] = true;
	if (!inputStartDay.value || inputStartDay.value > 31 || inputStartDay.value < 1) condition[2] = false;
	else condition[2] = true;
	if (!inputEndYear.value || inputEndYear.value > 3000 || inputEndYear.value < 1000) condition[3] = false;
	else condition[3] = true;
	if (!inputEndMonth.value || inputEndMonth.value > 12 || inputEndMonth.value < 1) condition[4] = false;
	else condition[4] = true;
	if (!inputEndDay.value || inputEndDay.value > 31 || inputEndDay.value < 1) condition[5] = false;
	else condition[5] = true;
	if (test.includes("Invalid")) condition[6] = false;
	else condition[6] = true;
	return condition;
}
