require("../stylesheets/diceRoller.scss");

const random = require("pengrape");

const outputContent = document.querySelector("#output-content");
const totalContent = document.querySelector("#total-content");
const buttonGenerate = document.querySelector("#button-generate");
const buttonTotal = document.querySelector("#button-total");
const ButtonIncreaseAmount = document.querySelector("#button-increase-amount");
const ButtonDecreaseAmount = document.querySelector("#button-decrease-amount");
const ButtonIncreaseSide = document.querySelector("#button-increase-side");
const ButtonDecreaseSide = document.querySelector("#button-decrease-side");
const amountOutput = document.querySelector("#amount-output");
const sideOutput = document.querySelector("#side-output");
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
	deleteResults();
	const output = random.dice({ notation: `${amountValue}d${sideValue}` });
	showResults(output.output, output.total);
});

const showResults = (results, total) => {
	for (let result of results) {
		const resultDiv = document.createElement("div");
		resultDiv.className = "col";
		resultDiv.innerHTML = result;
		outputContent.appendChild(resultDiv);
		buttonTotal.checked ? (totalContent.innerHTML = total) : (totalContent.innerHTML = "");
	}
};

const deleteResults = () => {
	outputContent.innerHTML = "";
};
