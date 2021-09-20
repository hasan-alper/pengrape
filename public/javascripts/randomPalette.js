require("../stylesheets/randomPalette.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const sectionResult = document.querySelector("#result");
const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const buttonUndo = document.querySelector("#button-undo");
const buttonHex = document.querySelector("#button-hex");
const buttonRgb = document.querySelector("#button-rgb");
const buttonHsl = document.querySelector("#button-hsl");
const radioColor = document.querySelectorAll('input[name="format"]');
const radioHarmony = document.querySelectorAll('input[name="harmony"]');
const color1 = document.querySelector("#color-1");
const color2 = document.querySelector("#color-2");
const color3 = document.querySelector("#color-3");
const color4 = document.querySelector("#color-4");
const color5 = document.querySelector("#color-5");

let index;
let harmony;
let history = [];
let color_list = [];
let mode = "generate";
let constructedResults = [];
buttonUndo.disabled = true;
const harmonies = ["analogous", "monochromatic", "triad", "complementary", "shades"];

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	radioHarmony.forEach((harmonyOpt, i) => {
		if (harmonyOpt.checked) {
			harmony = harmonies[i];
		}
	});

	if (mode === "construct") {
		let colorFormat;
		if (index === 0) colorFormat = "hex";
		else if (index === 1) colorFormat = "rgb";
		else if (index === 2) colorFormat = "hsl";
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		constructedResults = random.palette({ harmony: harmony, format: colorFormat, syntax: "normal", construct: +inputQuantity.value });
		construct(constructedResults);
		return;
	}

	color_list = random.palette({ harmony: harmony, format: "all", syntax: "all" });

	history.push(color_list);

	color1.style.backgroundColor = history[history.length - 1].normal[0][0];
	color1.innerHTML = history[history.length - 1].normal[index][0];
	color1.style.color = history[history.length - 1].list[2][0][2] > 45 ? "black" : "white";

	color2.style.backgroundColor = history[history.length - 1].normal[0][1];
	color2.innerHTML = history[history.length - 1].normal[index][1];
	color2.style.color = history[history.length - 1].list[2][1][2] > 45 ? "black" : "white";

	color3.style.backgroundColor = history[history.length - 1].normal[0][2];
	color3.innerHTML = history[history.length - 1].normal[index][2];
	color3.style.color = history[history.length - 1].list[2][2][2] > 45 ? "black" : "white";

	color4.style.backgroundColor = history[history.length - 1].normal[0][3];
	color4.innerHTML = history[history.length - 1].normal[index][3];
	color4.style.color = history[history.length - 1].list[2][3][2] > 45 ? "black" : "white";

	color5.style.backgroundColor = history[history.length - 1].normal[0][4];
	color5.innerHTML = history[history.length - 1].normal[index][4];
	color5.style.color = history[history.length - 1].list[2][4][2] > 45 ? "black" : "white";

	buttonHex.addEventListener("click", () => {
		color1.innerHTML = history[history.length - 1].normal[0][0];
		color2.innerHTML = history[history.length - 1].normal[0][1];
		color3.innerHTML = history[history.length - 1].normal[0][2];
		color4.innerHTML = history[history.length - 1].normal[0][3];
		color5.innerHTML = history[history.length - 1].normal[0][4];
	});
	buttonRgb.addEventListener("click", () => {
		color1.innerHTML = history[history.length - 1].normal[1][0];
		color2.innerHTML = history[history.length - 1].normal[1][1];
		color3.innerHTML = history[history.length - 1].normal[1][2];
		color4.innerHTML = history[history.length - 1].normal[1][3];
		color5.innerHTML = history[history.length - 1].normal[1][4];
	});
	buttonHsl.addEventListener("click", () => {
		color1.innerHTML = history[history.length - 1].normal[2][0];
		color2.innerHTML = history[history.length - 1].normal[2][1];
		color3.innerHTML = history[history.length - 1].normal[2][2];
		color4.innerHTML = history[history.length - 1].normal[2][3];
		color5.innerHTML = history[history.length - 1].normal[2][4];
	});

	if (history.length === 1) {
		buttonUndo.disabled = true;
	} else {
		buttonUndo.disabled = false;
	}
});

buttonUndo.addEventListener("click", () => {
	if (history.length > 1) {
		history.pop();
	}
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			color1.style.backgroundColor = history[history.length - 1].normal[0][0];
			color1.innerHTML = history[history.length - 1].normal[i][0];
			color1.style.color = history[history.length - 1].list[2][0][2] > 45 ? "black" : "white";

			color2.style.backgroundColor = history[history.length - 1].normal[0][1];
			color2.innerHTML = history[history.length - 1].normal[i][1];
			color2.style.color = history[history.length - 1].list[2][1][2] > 45 ? "black" : "white";

			color3.style.backgroundColor = history[history.length - 1].normal[0][2];
			color3.innerHTML = history[history.length - 1].normal[i][2];
			color3.style.color = history[history.length - 1].list[2][2][2] > 45 ? "black" : "white";

			color4.style.backgroundColor = history[history.length - 1].normal[0][3];
			color4.innerHTML = history[history.length - 1].normal[i][3];
			color4.style.color = history[history.length - 1].list[2][3][2] > 45 ? "black" : "white";

			color5.style.backgroundColor = history[history.length - 1].normal[0][4];
			color5.innerHTML = history[history.length - 1].normal[i][4];
			color5.style.color = history[history.length - 1].list[2][4][2] > 45 ? "black" : "white";
			index = i;
		}
	});

	if (history.length === 1) {
		buttonUndo.disabled = true;
	}
});

buttonTabsGenerate.addEventListener("click", () => {
	if (history.length > 0) {
		color1.style.backgroundColor = history[history.length - 1].normal[0][0];
		color1.innerHTML = history[history.length - 1].normal[index][0];
		color1.style.color = history[history.length - 1].list[2][0][2] > 45 ? "black" : "white";

		color2.style.backgroundColor = history[history.length - 1].normal[0][1];
		color2.innerHTML = history[history.length - 1].normal[index][1];
		color2.style.color = history[history.length - 1].list[2][1][2] > 45 ? "black" : "white";

		color3.style.backgroundColor = history[history.length - 1].normal[0][2];
		color3.innerHTML = history[history.length - 1].normal[index][2];
		color3.style.color = history[history.length - 1].list[2][2][2] > 45 ? "black" : "white";

		color4.style.backgroundColor = history[history.length - 1].normal[0][3];
		color4.innerHTML = history[history.length - 1].normal[index][3];
		color4.style.color = history[history.length - 1].list[2][3][2] > 45 ? "black" : "white";

		color5.style.backgroundColor = history[history.length - 1].normal[0][4];
		color5.innerHTML = history[history.length - 1].normal[index][4];
		color5.style.color = history[history.length - 1].list[2][4][2] > 45 ? "black" : "white";
	} else {
		color1.style.backgroundColor = "#fafbfc";
		color1.innerHTML = "";

		color2.style.backgroundColor = "#fafbfc";
		color2.innerHTML = "";

		color3.style.backgroundColor = "#fafbfc";
		color3.innerHTML = "";

		color4.style.backgroundColor = "#fafbfc";
		color4.innerHTML = "";

		color5.style.backgroundColor = "#fafbfc";
		color5.innerHTML = "";
	}
	if (history.length === 1) {
		buttonUndo.disabled = true;
	} else {
		buttonUndo.disabled = false;
	}
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "flex";
	constructContent.style.display = "none";
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
	if (mode === "generate") window.navigator.clipboard.writeText([color1.innerHTML, color2.innerHTML, color3.innerHTML, color4.innerHTML, color5.innerHTML]);
	else if (mode === "construct") window.navigator.clipboard.writeText(constructedResults);
});

const construct = (results) => {
	for (let result of results) {
		const allResults = document.createElement("div");
		allResults.className = "col";
		let prettyResult = [];
		for (let item of result) {
			prettyResult.push(" " + item);
			if (item == result[0]) prettyResult[0] = item;
		}
		allResults.innerHTML = prettyResult;
		constructedResultsContent.appendChild(allResults);
	}
};

const deleteResults = () => {
	constructedResultsContent.innerHTML = "";
};
