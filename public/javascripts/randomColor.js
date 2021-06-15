require("../stylesheets/randomColor.scss");

const random = require("pengrape");

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const hexButton = document.querySelector("#hex");
const rgbButton = document.querySelector("#rgb");
const hslButton = document.querySelector("#hsl");
const colorOpts = document.querySelectorAll('input[name="format"]');
const copyButton = document.querySelector("#copy-button");
const undoButton = document.querySelector("#undo-button");
const resultsSection = document.querySelector("#results-div");
const rangeLabels = document.querySelectorAll(".range-label");
const rangeOutputs = document.querySelectorAll(".range-output");
const range1 = document.querySelector("#range1");
const range2 = document.querySelector("#range2");
const range3 = document.querySelector("#range3");
const lockButton1 = document.querySelector("#lock-button-1");
const lockButton2 = document.querySelector("#lock-button-2");
const lockButton3 = document.querySelector("#lock-button-3");

let index;
let history = [];
const formats = ["hex", "rgb", "hsl"];
const lockedValues = [null, null, null];
const rgbLabels = ["Red:", "Green:", "Blue:"];
const hslLabels = ["Hue:", "Saturation:", "Lightness:"];

button.addEventListener("click", () => {
	colorOpts.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	if (lockButton1.checked) {
		if (index === 0) {
			let result = Math.abs(range1.value).toString(16);
			if (result.length < 2) result = "0" + result;
			lockedValues[0] = result;
		} else lockedValues[0] = range1.value;
	} else {
		lockedValues[0] = null;
	}

	if (lockButton2.checked) {
		if (index === 0) {
			let result = Math.abs(range2.value).toString(16);
			if (result.length < 2) result = "0" + result;
			lockedValues[1] = result;
		} else lockedValues[1] = range2.value;
	} else {
		lockedValues[1] = null;
	}

	if (lockButton3.checked) {
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

	output.style.color = colorCodes[3];
	output.innerHTML = colorCodes[index];
	resultsSection.style.backgroundColor = colorCodes[0];

	history.push([...colorCodes, ...colorCodesList]);

	rangeOutputs.forEach((rangeOutput, i) => {
		rangeOutput.innerHTML = history[history.length - 1][4 + index][i];
	});

	index === 0 ? (index = 1) : (index = index);

	range1.value = history[history.length - 1][4 + index][0];
	range2.value = history[history.length - 1][4 + index][1];
	range3.value = history[history.length - 1][4 + index][2];

	hexButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][0];
		resultsSection.style.backgroundColor = history[history.length - 1][0];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][4][i];
		});
		range1.value = history[history.length - 1][5][0];
		range2.value = history[history.length - 1][5][1];
		range3.value = history[history.length - 1][5][2];
	});
	rgbButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][1];
		resultsSection.style.backgroundColor = history[history.length - 1][1];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][5][i];
		});
		range1.value = history[history.length - 1][5][0];
		range2.value = history[history.length - 1][5][1];
		range3.value = history[history.length - 1][5][2];
	});
	hslButton.addEventListener("click", () => {
		output.innerHTML = history[history.length - 1][2];
		resultsSection.style.backgroundColor = history[history.length - 1][2];
		rangeOutputs.forEach((rangeOutput, i) => {
			rangeOutput.innerHTML = history[history.length - 1][6][i];
		});
		range1.value = history[history.length - 1][6][0];
		range2.value = history[history.length - 1][6][1];
		range3.value = history[history.length - 1][6][2];
	});
	if (history.length === 1) {
		undoButton.disabled = true;
	} else {
		undoButton.disabled = false;
	}
});

copyButton.addEventListener("click", () => {
	window.navigator.clipboard.writeText(output.innerText);
});

undoButton.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}
	colorOpts.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			output.style.color = history[history.length - 1][3];
			output.innerHTML = history[history.length - 1][i];
			resultsSection.style.backgroundColor = history[history.length - 1][0];
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
		undoButton.disabled = true;
	}
});

hexButton.addEventListener("click", () => {
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
rgbButton.addEventListener("click", () => {
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
hslButton.addEventListener("click", () => {
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
	colorOpts.forEach((colorOpt, i) => {
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
	colorOpts.forEach((colorOpt, i) => {
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
	colorOpts.forEach((colorOpt, i) => {
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

lockButton1.addEventListener("click", () => {
	lockButton1.checked ? (range1.disabled = true) : (range1.disabled = false);
});

lockButton2.addEventListener("click", () => {
	lockButton2.checked ? (range2.disabled = true) : (range2.disabled = false);
});

lockButton3.addEventListener("click", () => {
	lockButton3.checked ? (range3.disabled = true) : (range3.disabled = false);
});
