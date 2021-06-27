require("../stylesheets/diceRoller.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const outputContent = document.querySelector("#output-content");
const totalContent = document.querySelector("#total-content");
const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const buttonTotal = document.querySelector("#button-total");
const ButtonIncreaseAmount = document.querySelector("#button-increase-amount");
const ButtonDecreaseAmount = document.querySelector("#button-decrease-amount");
const ButtonIncreaseSide = document.querySelector("#button-increase-side");
const ButtonDecreaseSide = document.querySelector("#button-decrease-side");
const amountOutput = document.querySelector("#amount-output");
const sideOutput = document.querySelector("#side-output");
let mode = "generate";
let generatedResults = [];
let constructedResults = [];
let constructedResultsOnlyTotal = [];
let amountValue = 1;
let sideValue = 6;

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

buttonGenerate.addEventListener("click", () => {
	if (mode === "construct") {
		constructedResultsOnlyTotal = [];
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		constructedResults = random.dice({ notation: `${amountValue}d${sideValue}`, construct: +inputQuantity.value });
		for (let result of constructedResults) {
			constructedResultsOnlyTotal.push(result.total);
		}
		construct(constructedResultsOnlyTotal);
		return;
	}
	deleteGeneratedResults();
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

const deleteGeneratedResults = () => {
	outputContent.innerHTML = "";
};

buttonCopy.addEventListener("click", () => {
	if (mode === "generate") window.navigator.clipboard.writeText(generatedResults);
	else if (mode === "construct") window.navigator.clipboard.writeText(constructedResultsOnlyTotal);
});

buttonTabsGenerate.addEventListener("click", () => {
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "block";
	constructContent.style.display = "none";
});

buttonTabsConstruct.addEventListener("click", () => {
	mode = "construct";
	buttonGenerate.innerText = "Construct";
	resultContent.style.display = "none";
	constructContent.style.display = "flex";
});

const construct = (results) => {
	for (let result of results) {
		const allResults = document.createElement("div");
		allResults.className = "col";
		allResults.innerHTML = result;
		constructedResultsContent.appendChild(allResults);
	}
};

const deleteResults = () => {
	constructedResultsContent.innerHTML = "";
};
