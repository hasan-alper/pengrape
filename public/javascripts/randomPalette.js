require("../stylesheets/randomPalette.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const buttonUndo = document.querySelector("#button-undo");
const buttonHex = document.querySelector("#button-hex");
const buttonRgb = document.querySelector("#button-rgb");
const buttonHsl = document.querySelector("#button-hsl");
const radioColor = document.querySelectorAll('input[name="format"]');
const color1 = document.querySelector("#color-1");
const color2 = document.querySelector("#color-2");
const color3 = document.querySelector("#color-3");
const color4 = document.querySelector("#color-4");
const color5 = document.querySelector("#color-5");

let index;
let history = [];
let color_list = [];
buttonUndo.disabled = true;

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	color_list = random.palette({ format: "all", syntax: "all" });

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

buttonCopy.addEventListener("click", () => {
	window.navigator.clipboard.writeText([color1.innerHTML, color2.innerHTML, color3.innerHTML, color4.innerHTML, color5.innerHTML]);
});
