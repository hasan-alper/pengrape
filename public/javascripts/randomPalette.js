require("../stylesheets/randomPalette.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
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
let color_list = [];

buttonGenerate.addEventListener("click", () => {
	radioColor.forEach((colorOpt, i) => {
		if (colorOpt.checked) {
			index = i;
		}
	});

	color_list = random.palette({ format: "all", syntax: "all" });

	color1.style.backgroundColor = color_list.normal[0][0];
	color1.innerHTML = color_list.normal[index][0];
	color1.style.color = color_list.list[2][0][2] > 45 ? "black" : "white";

	color2.style.backgroundColor = color_list.normal[0][1];
	color2.innerHTML = color_list.normal[index][1];
	color2.style.color = color_list.list[2][1][2] > 45 ? "black" : "white";

	color3.style.backgroundColor = color_list.normal[0][2];
	color3.innerHTML = color_list.normal[index][2];
	color3.style.color = color_list.list[2][2][2] > 45 ? "black" : "white";

	color4.style.backgroundColor = color_list.normal[0][3];
	color4.innerHTML = color_list.normal[index][3];
	color4.style.color = color_list.list[2][3][2] > 45 ? "black" : "white";

	color5.style.backgroundColor = color_list.normal[0][4];
	color5.innerHTML = color_list.normal[index][4];
	color5.style.color = color_list.list[2][4][2] > 45 ? "black" : "white";

	buttonHex.addEventListener("click", () => {
		color1.innerHTML = color_list.normal[0][0];
		color2.innerHTML = color_list.normal[0][1];
		color3.innerHTML = color_list.normal[0][2];
		color4.innerHTML = color_list.normal[0][3];
		color5.innerHTML = color_list.normal[0][4];
	});
	buttonRgb.addEventListener("click", () => {
		color1.innerHTML = color_list.normal[1][0];
		color2.innerHTML = color_list.normal[1][1];
		color3.innerHTML = color_list.normal[1][2];
		color4.innerHTML = color_list.normal[1][3];
		color5.innerHTML = color_list.normal[1][4];
	});
	buttonHsl.addEventListener("click", () => {
		color1.innerHTML = color_list.normal[2][0];
		color2.innerHTML = color_list.normal[2][1];
		color3.innerHTML = color_list.normal[2][2];
		color4.innerHTML = color_list.normal[2][3];
		color5.innerHTML = color_list.normal[2][4];
	});
});

buttonCopy.addEventListener("click", () => {
	window.navigator.clipboard.writeText([color1.innerHTML, color2.innerHTML, color3.innerHTML, color4.innerHTML, color5.innerHTML]);
});
