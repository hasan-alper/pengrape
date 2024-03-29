require("../stylesheets/randomPalette.scss");

const random = require("pengrape");

const colorPrimary = "#eb4763";
const colorBlack = "#202020";
const colorDark = "#505050";
const colorGray = "#a3a3a3";
const colorWhite = "#fbfbfb";

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");

const radioColor = document.querySelectorAll('input[name="format"]');
const buttonHex = document.querySelector("#button-hex");
const buttonRgb = document.querySelector("#button-rgb");
const buttonHsl = document.querySelector("#button-hsl");

const sectionResult = document.querySelector("#result");
const resultContent = document.querySelector("#result-content");
const sectionColors = document.querySelectorAll(".section-colors");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const buttonUndo = document.querySelector("#button-undo");

const radioHarmony = document.querySelectorAll('input[name="harmony"]');

const harmonies = ["analogous", "monochromatic", "triad", "complementary", "shades"];

let mode = "generate";
let history = [];
let color_list = [];
let colorFormatIndex;
let harmony;
let constructedResults = [];

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			colorFormatIndex = i;
		}
	});

	radioHarmony.forEach((harmonyOpt, i) => {
		if (harmonyOpt.checked) {
			harmony = harmonies[i];
		}
	});

	const construct = +inputQuantity.value;

	if (mode === "construct") {
		let format;
		if (colorFormatIndex === 0) format = "hex";
		else if (colorFormatIndex === 1) format = "rgb";
		else if (colorFormatIndex === 2) format = "hsl";
		constructedResultsContent.innerHTML = "";
		constructedResults = random.palette({ harmony, format, syntax: "normal", construct });
		constructor(constructedResults);
		return;
	}

	color_list = random.palette({ harmony: harmony, format: "all", syntax: "all" });

	history.push(color_list);

	for (let i = 0; i < 5; i++) {
		sectionColors[i].style.backgroundColor = history[history.length - 1].normal[0][i];
		sectionColors[i].innerHTML = history[history.length - 1].normal[colorFormatIndex][i].replaceAll(" ", "");
		sectionColors[i].style.color = history[history.length - 1].list[2][i][2] > 45 ? colorBlack : "white";

		buttonHex.addEventListener("click", () => {
			sectionColors[i].innerHTML = history[history.length - 1].normal[0][i].replaceAll(" ", "");
		});
		buttonRgb.addEventListener("click", () => {
			sectionColors[i].innerHTML = history[history.length - 1].normal[1][i].replaceAll(" ", "");
		});
		buttonHsl.addEventListener("click", () => {
			sectionColors[i].innerHTML = history[history.length - 1].normal[2][i].replaceAll(" ", "");
		});
	}

	if (history.length === 1) buttonUndo.disabled = true;
	else buttonUndo.disabled = false;
});

buttonUndo.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}

	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			colorFormatIndex = i;
			for (let i = 0; i < 5; i++) {
				sectionColors[i].style.backgroundColor = history[history.length - 1].normal[0][i];
				sectionColors[i].innerHTML = history[history.length - 1].normal[colorFormatIndex][i].replaceAll(" ", "");
				sectionColors[i].style.color = history[history.length - 1].list[2][i][2] > 45 ? colorBlack : "white";
			}
		}
	});

	if (history.length === 1) {
		buttonUndo.disabled = true;
	}
});

buttonTabsGenerate.addEventListener("click", () => {
	if (history.length > 0) {
		radioColor.forEach((colorOpt, i) => {
			if (colorOpt.checked) {
				colorFormatIndex = i;
				for (let i = 0; i < 5; i++) {
					sectionColors[i].style.backgroundColor = history[history.length - 1].normal[0][i];
					sectionColors[i].innerHTML = history[history.length - 1].normal[colorFormatIndex][i].replaceAll(" ", "");
					sectionColors[i].style.color = history[history.length - 1].list[2][i][2] > 45 ? colorBlack : "white";
				}
			}
		});
	} else {
		for (let i = 0; i < 5; i++) {
			sectionColors[i].style.backgroundColor = colorWhite;
			sectionColors[i].innerHTML = "";
		}
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
	resultContent.style.color = colorBlack;
	sectionResult.style.backgroundColor = colorWhite;
	buttonUndo.disabled = true;
	mode = "construct";
	buttonGenerate.innerText = "Construct";
	resultContent.style.display = "none";
	constructContent.style.display = "flex";
});

buttonCopy.addEventListener("click", () => {
	switch (mode) {
		case "generate":
			window.navigator.clipboard.writeText(sectionColors[0].innerHTML ? [sectionColors[0].innerHTML, sectionColors[1].innerHTML, sectionColors[2].innerHTML, sectionColors[3].innerHTML, sectionColors[4].innerHTML] : "");
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
		let prettyResult = [];
		for (let item of result) {
			prettyResult.push(" " + item.replaceAll(" ", ""));
			if (item == result[0]) prettyResult[0] = item.replaceAll(" ", "");
		}
		allResults.innerHTML = prettyResult;
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
