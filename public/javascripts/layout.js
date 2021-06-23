require("../stylesheets/layout.scss");

const sectionOptions = document.querySelector("#options");
const buttonOptions = document.querySelector("#button-options");

buttonOptions.addEventListener("click", () => {
	if (buttonOptions.checked) sectionOptions.style.display = "flex";
	else sectionOptions.style.display = "none";
});
