require("../stylesheets/randomPalette.scss");

const random = require("pengrape");

const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const color1 = document.querySelector("#color-1");
const color2 = document.querySelector("#color-2");
const color3 = document.querySelector("#color-3");
const color4 = document.querySelector("#color-4");
const color5 = document.querySelector("#color-5");
let color_list = [];

buttonGenerate.addEventListener("click", () => {
	color_list = random.palette();

	color1.style.backgroundColor = color_list[0];
	color1.innerHTML = color_list[0];

	color2.style.backgroundColor = color_list[1];
	color2.innerHTML = color_list[1];

	color3.style.backgroundColor = color_list[2];
	color3.innerHTML = color_list[2];

	color4.style.backgroundColor = color_list[3];
	color4.innerHTML = color_list[3];

	color5.style.backgroundColor = color_list[4];
	color5.innerHTML = color_list[4];

	// color1.style.backgroundColor = color_list[0].normal[0];
	// color1.innerHTML = color_list[0].normal[0];
	// color1.style.color = color_list[0].list[2][2] > 45 ? "black" : "white";

	// color2.style.backgroundColor = color_list[1].normal[0];
	// color2.innerHTML = color_list[1].normal[0];
	// color2.style.color = color_list[1].list[2][2] > 45 ? "black" : "white";

	// color3.style.backgroundColor = color_list[2].normal[0];
	// color3.innerHTML = color_list[2].normal[0];
	// color3.style.color = color_list[2].list[2][2] > 45 ? "black" : "white";

	// color4.style.backgroundColor = color_list[3].normal[0];
	// color4.innerHTML = color_list[3].normal[0];
	// color4.style.color = color_list[3].list[2][2] > 45 ? "black" : "white";

	// color5.style.backgroundColor = color_list[4].normal[0];
	// color5.innerHTML = color_list[4].normal[0];
	// color5.style.color = color_list[4].list[2][2] > 45 ? "black" : "white";
});

buttonCopy.addEventListener("click", () => {
	window.navigator.clipboard.writeText([color1.innerHTML, color2.innerHTML, color3.innerHTML, color4.innerHTML, color5.innerHTML]);
});
