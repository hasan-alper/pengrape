import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const colorOpts = document.querySelectorAll('input[name="color"]');

button.addEventListener("click", () => {
	let selected;

	for (const colorOpt of colorOpts) {
		if (colorOpt.checked) {
			selected = colorOpt.value;
			break;
		}
	}

	let colorCode = random.color({ type: selected });
	output.innerHTML = colorCode;
	output.style.backgroundColor = colorCode;
});

// switching between options
