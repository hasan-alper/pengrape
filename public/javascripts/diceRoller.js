import { random } from "/static/javascripts/index.js";

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
	const results = random.dice({ notation: `${amountValue}d${sideValue}`, returnTotal: totalButton.checked ? true : false });
	showResults(results[0], results[1]);
});

const showResults = (results, total) => {
	for (let result of results) {
		const resultDiv = document.createElement("div");
		resultDiv.className = "col";
		resultDiv.innerHTML = result;
		output.appendChild(resultDiv);
		totalOutput.innerHTML = total || "-";
	}
};

const deleteResults = () => {
	output.innerHTML = "";
};
