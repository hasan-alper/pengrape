require("../stylesheets/diceRoller.scss");

const random = require("pengrape");

const colorPrimary = "#eb4763";
const colorBlack = "#202020";
const colorDark = "#505050";
const colorGray = "#a3a3a3";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const buttonTotal = document.querySelector("#button-total");

const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const outputContent = document.querySelector("#output-content");
const totalContent = document.querySelector("#total-content");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");

const ButtonIncreaseAmount = document.querySelector("#button-increase-amount");
const ButtonDecreaseAmount = document.querySelector("#button-decrease-amount");
const ButtonIncreaseSide = document.querySelector("#button-increase-side");
const ButtonDecreaseSide = document.querySelector("#button-decrease-side");
const amountOutput = document.querySelector("#amount-output");
const sideOutput = document.querySelector("#side-output");

let amountValue = 1;
let sideValue = 6;

let mode = "generate";
let generatedResults = [];
let constructedResults = [];
let constructedResultsOnlyTotal = [];

buttonGenerate.addEventListener("click", () => {
	constructedResultsOnlyTotal = [];
	const construct = +inputQuantity.value;

	if (mode === "construct") {
		constructedResultsContent.innerHTML = "";
		constructedResults = random.dice({ notation: `${amountValue}d${sideValue}`, construct });
		for (let result of constructedResults) {
			constructedResultsOnlyTotal.push(result.total);
		}
		constructor(constructedResultsOnlyTotal);
		return;
	}
	outputContent.innerHTML = "";
	const output = random.dice({ notation: `${amountValue}d${sideValue}` });
	generatedResults = output.output;
	showResults(output.output, output.total);
});

const showResults = (results, total) => {
	for (let result of results) {
		const resultDiv = document.createElement("div");
		resultDiv.className = "results-item";
		resultDiv.innerHTML = result;
		outputContent.appendChild(resultDiv);
		buttonTotal.checked ? (totalContent.innerHTML = total) : (totalContent.innerHTML = "");
	}
};

ButtonIncreaseAmount.addEventListener("click", () => {
	amountValue++;
	amountOutput.innerHTML = amountValue;
});

ButtonDecreaseAmount.addEventListener("click", () => {
	if (amountValue > 1) {
		amountValue--;
		amountOutput.innerHTML = amountValue;
	}
});

ButtonIncreaseSide.addEventListener("click", () => {
	sideValue++;
	sideOutput.innerHTML = sideValue;
});

ButtonDecreaseSide.addEventListener("click", () => {
	if (sideValue > 2) {
		sideValue--;
		sideOutput.innerHTML = sideValue;
	}
});

buttonTabsGenerate.addEventListener("click", () => {
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "block";
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
			window.navigator.clipboard.writeText(generatedResults);
			break;
		case "construct":
			window.navigator.clipboard.writeText(constructedResultsOnlyTotal);
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
	const construct = +inputQuantity.value;

	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[0] = true;
	else condition[0] = false;

	return condition;
};

const validate = () => {
	const conditions = condition();
	if (conditions.includes(false)) buttonGenerate.disabled = true;
	else buttonGenerate.disabled = false;
	if (!conditions[0]) {
		inputQuantity.style.color = colorPrimary;
		inputQuantity.style.borderColor = colorPrimary;
	} else {
		inputQuantity.style.color = colorDark;
		inputQuantity.style.borderColor = colorGray;
	}
};

inputQuantity.addEventListener("input", validate);
