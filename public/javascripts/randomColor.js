require("../stylesheets/randomColor.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const radioColor = document.querySelectorAll('input[name="format"]');
const buttonHex = document.querySelector("#button-hex");
const buttonRgb = document.querySelector("#button-rgb");
const buttonHsl = document.querySelector("#button-hsl");

const rangeLabels = document.querySelectorAll(".range-label");
const rangeOutputs = document.querySelectorAll(".range-output");
const rangeValues = document.querySelectorAll(".range-values");
const buttonLock = document.querySelectorAll(".button-lock");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const buttonUndo = document.querySelector("#button-undo");

const sectionResult = document.querySelector("#result");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const formats = ["hex", "rgb", "hsl"];
const lockedValues = [null, null, null];
const rgbLabels = ["Red:", "Green:", "Blue:"];
const hslLabels = ["Hue:", "Saturation:", "Lightness:"];

let mode = "generate";
let history = [];
let colorFormatIndex;
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			colorFormatIndex = i;
		}
	});

	for (let i = 0; i < 3; i++) {
		if (buttonLock[i].checked) {
			if (colorFormatIndex === 0) {
				let result = Math.abs(rangeValues[i].value).toString(16);
				if (result.length < 2) result = "0" + result;
				lockedValues[i] = result;
			} else lockedValues[i] = rangeValues[i].value;
		} else {
			lockedValues[i] = null;
		}
	}

	const construct = +inputQuantity.value;

	if (mode === "construct") {
		let format;
		if (colorFormatIndex === 0) format = "hex";
		else if (colorFormatIndex === 1) format = "rgb";
		else if (colorFormatIndex === 2) format = "hsl";
		constructedResultsContent.innerHTML = "";
		constructedResults = random.color({ format, syntax: "normal", values: [...lockedValues], construct });
		constructor(constructedResults);
		return;
	}

	const colorCodes = random.color({ format: "all", syntax: "all", values: [formats[colorFormatIndex], ...lockedValues] });
	history.push(colorCodes);

	sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
	resultContent.innerHTML = history[history.length - 1].normal[colorFormatIndex];
	resultContent.style.color = history[history.length - 1].list[2][2] > 45 ? "black" : "white";

	rangeOutputs.forEach((rangeOutput, i) => {
		rangeOutput.innerHTML = history[history.length - 1].list[colorFormatIndex][i];
	});

	colorFormatIndex === 0 ? (colorFormatIndex = 1) : (colorFormatIndex = colorFormatIndex);

	rangeValues[0].value = history[history.length - 1].list[colorFormatIndex][0];
	rangeValues[1].value = history[history.length - 1].list[colorFormatIndex][1];
	rangeValues[2].value = history[history.length - 1].list[colorFormatIndex][2];

	buttonHex.addEventListener("click", () => {
		if (mode === "generate") {
			resultContent.innerHTML = history[history.length - 1].normal[0];
			sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
		}
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1].list[0][i];
		});
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = history[history.length - 1].list[1][i];
		}
	});

	buttonRgb.addEventListener("click", () => {
		if (mode === "generate") {
			resultContent.innerHTML = history[history.length - 1].normal[1];
			sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
		}
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1].list[1][i];
		});
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = history[history.length - 1].list[1][i];
		}
	});

	buttonHsl.addEventListener("click", () => {
		if (mode === "generate") {
			resultContent.innerHTML = history[history.length - 1].normal[2];
			sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
		}
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1].list[2][i];
		});
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = history[history.length - 1].list[2][i];
		}
	});

	if (history.length === 1) buttonUndo.disabled = true;
	else buttonUndo.disabled = false;
});

buttonUndo.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
			resultContent.innerHTML = history[history.length - 1].normal[i];
			resultContent.style.color = history[history.length - 1].list[2][2] > 45 ? "black" : "white";
			colorFormatIndex = i;
		}
	});
	rangeOutputs.forEach((rangeOutput, i) => {
		rangeOutput.innerHTML = history[history.length - 1].list[colorFormatIndex][i];
	});

	colorFormatIndex === 0 ? (colorFormatIndex = 1) : (colorFormatIndex = colorFormatIndex);

	rangeValues[0].value = history[history.length - 1].list[colorFormatIndex][0];
	rangeValues[1].value = history[history.length - 1].list[colorFormatIndex][1];
	rangeValues[2].value = history[history.length - 1].list[colorFormatIndex][2];

	if (history.length === 1) buttonUndo.disabled = true;
});

buttonHex.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = rgbLabels[i];
	});
	if (history.length == 0) {
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = 0;
			rangeOutputs[i].innerHTML = "00";
		}
	}
	rangeValues[0].min = 0;
	rangeValues[0].max = 255;
	rangeValues[1].min = 0;
	rangeValues[1].max = 255;
	rangeValues[2].min = 0;
	rangeValues[2].max = 255;
});

buttonRgb.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = rgbLabels[i];
	});
	if (history.length == 0) {
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = 0;
			rangeOutputs[i].innerHTML = "00";
		}
	}
	rangeValues[0].min = 0;
	rangeValues[0].max = 255;
	rangeValues[1].min = 0;
	rangeValues[1].max = 255;
	rangeValues[2].min = 0;
	rangeValues[2].max = 255;
});

buttonHsl.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = hslLabels[i];
	});
	if (history.length == 0) {
		for (let i = 0; i < 3; i++) {
			rangeValues[i].value = 0;
			rangeOutputs[i].innerHTML = "00";
		}
	}
	rangeValues[0].min = 0;
	rangeValues[0].max = 359;
	rangeValues[1].min = 0;
	rangeValues[1].max = 100;
	rangeValues[2].min = 0;
	rangeValues[2].max = 100;
});

for (let i = 0; i < 3; i++) {
	rangeValues[i].addEventListener("input", () => {
		radioColor.forEach((colorOpt, i) => {
			if (colorOpt.checked) {
				colorFormatIndex = i;
			}
		});
		if (colorFormatIndex === 0) {
			let result = Math.abs(rangeValues[i].value).toString(16);
			if (result.length < 2) result = "0" + result;
			rangeOutputs[i].innerHTML = result;
		} else rangeOutputs[i].innerHTML = rangeValues[i].value;
	});
	buttonLock[i].addEventListener("click", () => {
		buttonLock[i].checked ? (rangeValues[i].disabled = true) : (rangeValues[i].disabled = false);
	});
}

buttonTabsGenerate.addEventListener("click", () => {
	if (history.length > 0) {
		sectionResult.style.backgroundColor = history[history.length - 1].normal[0];
		resultContent.style.color = history[history.length - 1].list[2][2] > 45 ? "black" : "white";
	} else {
		sectionResult.style.backgroundColor = "#fafbfc";
		resultContent.innerHTML = "";
	}
	if (history.length === 1) buttonUndo.disabled = true;
	else buttonUndo.disabled = false;
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "flex";
	constructContent.style.display = "none";
	inputQuantity.value = 4;
	validate();
});

buttonTabsConstruct.addEventListener("click", () => {
	resultContent.style.color = "#24292e";
	sectionResult.style.backgroundColor = "#fafbfc";
	buttonUndo.disabled = true;
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
	const construct = +inputQuantity.value;

	if (Number.isInteger(construct) && 0 < construct && construct < 10000) condition[0] = true;
	else condition[0] = false;

	return condition;
};

const validate = () => {
	if (condition().includes(false)) buttonGenerate.disabled = true;
	else buttonGenerate.disabled = false;
};

inputQuantity.addEventListener("input", validate);
