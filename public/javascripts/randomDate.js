require("../stylesheets/randomDate.scss");

const random = require("pengrape");

const colorPrimary = "#eb4763";
const colorBlack = "#202020";
const colorDark = "#505050";
const colorGray = "#a3a3a3";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const inputCustomFormat = document.querySelector("#input-custom-format");

const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");

const inputStartYear = document.querySelector("#input-start-year");
const inputStartMonth = document.querySelector("#input-start-month");
const inputStartDay = document.querySelector("#input-start-day");
const inputEndYear = document.querySelector("#input-end-year");
const inputEndMonth = document.querySelector("#input-end-month");
const inputEndDay = document.querySelector("#input-end-day");

inputStartYear.value = new Date().getFullYear();
inputStartMonth.value = new Date().getMonth() + 1;
inputStartDay.value = new Date().getDate();
inputEndYear.value = new Date().getFullYear() + 1;
inputEndMonth.value = 1;
inputEndDay.value = 1;

let mode = "generate";
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	const dateStart = [+inputStartYear.value, +inputStartMonth.value, +inputStartDay.value];
	const dateEnd = [+inputEndYear.value, +inputEndMonth.value, +inputEndDay.value];
	const format = inputCustomFormat.value ? inputCustomFormat.value : "yyyy-mm-dd";

	const construct = +inputQuantity.value;

	switch (mode) {
		case "generate":
			resultContent.innerHTML = random.date({ dateStart, dateEnd, format });
			break;
		case "construct":
			constructedResultsContent.innerHTML = "";
			constructedResults = random.date({ dateStart, dateEnd, format, construct });
			constructor(constructedResults);
			break;
	}
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
	const startYear = +inputStartYear.value;
	const startMonth = +inputStartMonth.value;
	const startDay = +inputStartDay.value;
	const endYear = +inputEndYear.value;
	const endMonth = +inputEndMonth.value;
	const endDay = +inputEndDay.value;
	const construct = +inputQuantity.value;
	const dateStart = [startYear, startMonth, startDay];
	const dateEnd = [endYear, endMonth, endDay];

	if (999 < startYear && startYear < 3000) condition[0] = true;
	else condition[0] = false;
	if (0 < startMonth && startMonth < 13) condition[1] = true;
	else condition[1] = false;
	if (0 < startDay && startDay < 32) condition[2] = true;
	else condition[2] = false;
	if (999 < endYear && endYear < 3000) condition[3] = true;
	else condition[3] = false;
	if (0 < endMonth && endMonth < 13) condition[4] = true;
	else condition[4] = false;
	if (0 < endDay && endDay < 32) condition[5] = true;
	else condition[5] = false;
	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[6] = true;
	else condition[6] = false;
	try {
		random.date({ dateStart, dateEnd });
		condition[7] = true;
	} catch (err) {
		condition[7] = false;
	}

	return condition;
};

const validate = () => {
	const conditions = condition();
	if (conditions.includes(false)) buttonGenerate.disabled = true;
	else buttonGenerate.disabled = false;
	if (!conditions[0]) {
		inputStartYear.style.color = colorPrimary;
		inputStartYear.style.borderColor = colorPrimary;
	} else {
		inputStartYear.style.color = colorDark;
		inputStartYear.style.borderColor = colorGray;
	}
	if (!conditions[1]) {
		inputStartMonth.style.color = colorPrimary;
		inputStartMonth.style.borderColor = colorPrimary;
	} else {
		inputStartMonth.style.color = colorDark;
		inputStartMonth.style.borderColor = colorGray;
	}
	if (!conditions[2]) {
		inputStartDay.style.color = colorPrimary;
		inputStartDay.style.borderColor = colorPrimary;
	} else {
		inputStartDay.style.color = colorDark;
		inputStartDay.style.borderColor = colorGray;
	}
	if (!conditions[3]) {
		inputEndYear.style.color = colorPrimary;
		inputEndYear.style.borderColor = colorPrimary;
	} else {
		inputEndYear.style.color = colorDark;
		inputEndYear.style.borderColor = colorGray;
	}
	if (!conditions[4]) {
		inputEndMonth.style.color = colorPrimary;
		inputEndMonth.style.borderColor = colorPrimary;
	} else {
		inputEndMonth.style.color = colorDark;
		inputEndMonth.style.borderColor = colorGray;
	}
	if (!conditions[5]) {
		inputEndDay.style.color = colorPrimary;
		inputEndDay.style.borderColor = colorPrimary;
	} else {
		inputEndDay.style.color = colorDark;
		inputEndDay.style.borderColor = colorGray;
	}
	if (!conditions[6]) {
		inputQuantity.style.color = colorPrimary;
		inputQuantity.style.borderColor = colorPrimary;
	} else {
		inputQuantity.style.color = colorDark;
		inputQuantity.style.borderColor = colorGray;
	}
	if (!conditions[7]) {
		if (!conditions[0] || !conditions[1] || !conditions[2] || !conditions[3] || !conditions[4] || !conditions[5]) {
			document.querySelector("#start-label").style.color = colorDark;
			document.querySelector("#end-label").style.color = colorDark;
		} else {
			document.querySelector("#start-label").style.color = colorPrimary;
			document.querySelector("#end-label").style.color = colorPrimary;
		}
	} else {
		document.querySelector("#start-label").style.color = colorDark;
		document.querySelector("#end-label").style.color = colorDark;
	}
};

inputStartYear.addEventListener("input", validate);
inputStartMonth.addEventListener("input", validate);
inputStartDay.addEventListener("input", validate);
inputEndYear.addEventListener("input", validate);
inputEndMonth.addEventListener("input", validate);
inputEndDay.addEventListener("input", validate);
inputQuantity.addEventListener("input", validate);
