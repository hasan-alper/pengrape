require("../stylesheets/diceRoller.scss");

const random = require("pengrape");

const output = document.querySelector("#output");
const totalOutput = document.querySelector("#total-output");
const button = document.querySelector("#button");
const totalButton = document.querySelector("#total-button");
const increaseAmount = document.querySelector("#increase-amount");
const decreaseAmount = document.querySelector("#decrease-amount");
const increaseSide = document.querySelector("#increase-side");
const decreaseSide = document.querySelector("#decrease-side");
const amountOutput = document.querySelector("#amount-output");
const sideOutput = document.querySelector("#side-output");
let amountValue = 1;
let sideValue = 6;

increaseAmount.addEventListener("click", () => {
	amountValue++;
	amountOutput.innerHTML = amountValue;
});
decreaseAmount.addEventListener("click", () => {
	if (amountValue > 1) {
		amountValue--;
		amountOutput.innerHTML = amountValue;
	}
});
increaseSide.addEventListener("click", () => {
	sideValue++;
	sideOutput.innerHTML = sideValue;
});
decreaseSide.addEventListener("click", () => {
	if (sideValue > 2) {
		sideValue--;
		sideOutput.innerHTML = sideValue;
	}
});

button.addEventListener("click", () => {
	deleteResults();
	const output = random.dice({ notation: `${amountValue}d${sideValue}` });
	showResults(output.output, output.total);
});

const showResults = (results, total) => {
	for (let result of results) {
		const resultDiv = document.createElement("div");
		resultDiv.className = "col";
		resultDiv.innerHTML = result;
		output.appendChild(resultDiv);
		totalButton.checked ? (totalOutput.innerHTML = total) : (totalOutput.innerHTML = "");
	}
};

const deleteResults = () => {
	output.innerHTML = "";
};
