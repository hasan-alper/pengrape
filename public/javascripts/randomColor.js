require("../stylesheets/randomColor.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const resultContent = document.querySelector("#result-content");
const buttonHex = document.querySelector("#button-hex");
const buttonRgb = document.querySelector("#button-rgb");
const buttonHsl = document.querySelector("#button-hsl");
const radioColor = document.querySelectorAll('input[name="format"]');
const buttonColor = document.querySelector("#button-copy");
const buttonUndo = document.querySelector("#button-undo");
const sectionResult = document.querySelector("#result");
const rangeLabels = document.querySelectorAll(".range-label");
const rangeOutputs = document.querySelectorAll(".range-output");
const range1 = document.querySelector("#range-1");
const range2 = document.querySelector("#range-2");
const range3 = document.querySelector("#range-3");
const buttonLock1 = document.querySelector("#button-lock-1");
const buttonLock2 = document.querySelector("#button-lock-2");
const buttonLock3 = document.querySelector("#button-lock-3");

let index;
let history = [];
const formats = ["hex", "rgb", "hsl"];
const lockedValues = [null, null, null];
const rgbLabels = ["Red:", "Green:", "Blue:"];
const hslLabels = ["Hue:", "Saturation:", "Lightness:"];

buttonUndo.disabled = true;

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	if (buttonLock1.checked) {
		if (index === 0) {
			let result = Math.abs(range1.value).toString(16);
			if (result.length < 2) result = "0" + result;
			lockedValues[0] = result;
		} else lockedValues[0] = range1.value;
	} else {
		lockedValues[0] = null;
	}

	if (buttonLock2.checked) {
		if (index === 0) {
			let result = Math.abs(range2.value).toString(16);
			if (result.length < 2) result = "0" + result;
			lockedValues[1] = result;
		} else lockedValues[1] = range2.value;
	} else {
		lockedValues[1] = null;
	}

	if (buttonLock3.checked) {
		if (index === 0) {
			let result = Math.abs(range3.value).toString(16);
			if (result.length < 2) result = "0" + result;
			lockedValues[2] = result;
		} else lockedValues[2] = range3.value;
	} else {
		lockedValues[2] = null;
	}

	let colorCodes = random.color({ format: "all", syntax: "all", values: [formats[index], ...lockedValues] });
	const colorCodesList = colorCodes.list;
	colorCodes = colorCodes.normal;

	let lightness = colorCodesList[2][2];

	if (lightness > 45) lightness = "black";
	else lightness = "white";

	colorCodes.push(lightness);

	resultContent.style.color = colorCodes[3];
	resultContent.innerHTML = colorCodes[index];
	sectionResult.style.backgroundColor = colorCodes[0];

	history.push([...colorCodes, ...colorCodesList]);

	rangeOutputs.forEach((rangeOutput, i) => {
		rangeOutput.innerHTML = history[history.length - 1][4 + index][i];
	});

	index === 0 ? (index = 1) : (index = index);

	range1.value = history[history.length - 1][4 + index][0];
	range2.value = history[history.length - 1][4 + index][1];
	range3.value = history[history.length - 1][4 + index][2];

	buttonHex.addEventListener("click", () => {
		resultContent.innerHTML = history[history.length - 1][0];
		sectionResult.style.backgroundColor = history[history.length - 1][0];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][4][i];
		});
		range1.value = history[history.length - 1][5][0];
		range2.value = history[history.length - 1][5][1];
		range3.value = history[history.length - 1][5][2];
	});
	buttonRgb.addEventListener("click", () => {
		resultContent.innerHTML = history[history.length - 1][1];
		sectionResult.style.backgroundColor = history[history.length - 1][1];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][5][i];
		});
		range1.value = history[history.length - 1][5][0];
		range2.value = history[history.length - 1][5][1];
		range3.value = history[history.length - 1][5][2];
	});
	buttonHsl.addEventListener("click", () => {
		resultContent.innerHTML = history[history.length - 1][2];
		sectionResult.style.backgroundColor = history[history.length - 1][2];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][6][i];
		});
		range1.value = history[history.length - 1][6][0];
		range2.value = history[history.length - 1][6][1];
		range3.value = history[history.length - 1][6][2];
	});
	if (history.length === 1) {
		buttonUndo.disabled = true;
	} else {
		buttonUndo.disabled = false;
	}
});

buttonColor.addEventListener("click", () => {
	window.navigator.clipboard.writeText(resultContent.innerText);
});

buttonUndo.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			resultContent.style.color = history[history.length - 1][3];
			resultContent.innerHTML = history[history.length - 1][i];
			sectionResult.style.backgroundColor = history[history.length - 1][0];
			index = i;
		}
	});
	rangeOutputs.forEach((rangeOutput, i) => {
		rangeOutput.innerHTML = history[history.length - 1][4 + index][i];
	});

	index === 0 ? (index = 1) : (index = index);

	range1.value = history[history.length - 1][4 + index][0];
	range2.value = history[history.length - 1][4 + index][1];
	range3.value = history[history.length - 1][4 + index][2];

	if (history.length === 1) {
		buttonUndo.disabled = true;
	}
});

buttonHex.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = rgbLabels[i];
	});
	range1.min = 0;
	range1.max = 255;
	range2.min = 0;
	range2.max = 255;
	range3.min = 0;
	range3.max = 255;
});
buttonRgb.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = rgbLabels[i];
	});
	range1.min = 0;
	range1.max = 255;
	range2.min = 0;
	range2.max = 255;
	range3.min = 0;
	range3.max = 255;
});
buttonHsl.addEventListener("click", () => {
	rangeLabels.forEach((rangeLabel, i) => {
		rangeLabel.innerHTML = hslLabels[i];
	});
	range1.min = 0;
	range1.max = 359;
	range2.min = 0;
	range2.max = 100;
	range3.min = 0;
	range3.max = 100;
});

range1.addEventListener("input", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});
	if (index === 0) {
		let result = Math.abs(range1.value).toString(16);
		if (result.length < 2) result = "0" + result;
		rangeOutputs[0].innerHTML = result;
	} else rangeOutputs[0].innerHTML = range1.value;
});

range2.addEventListener("input", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});
	if (index === 0) {
		let result = Math.abs(range2.value).toString(16);
		if (result.length < 2) result = "0" + result;
		rangeOutputs[1].innerHTML = result;
	} else rangeOutputs[1].innerHTML = range2.value;
});

range3.addEventListener("input", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});
	if (index === 0) {
		let result = Math.abs(range3.value).toString(16);
		if (result.length < 2) result = "0" + result;
		rangeOutputs[2].innerHTML = result;
	} else rangeOutputs[2].innerHTML = range3.value;
});

buttonLock1.addEventListener("click", () => {
	buttonLock1.checked ? (range1.disabled = true) : (range1.disabled = false);
});

buttonLock2.addEventListener("click", () => {
	buttonLock2.checked ? (range2.disabled = true) : (range2.disabled = false);
});

buttonLock3.addEventListener("click", () => {
	buttonLock3.checked ? (range3.disabled = true) : (range3.disabled = false);
});
