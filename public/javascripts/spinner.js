require("../stylesheets/spinner.scss");

const random = require("pengrape");

const buttonTabsGenerate = document.querySelector("#button-tabs-generate");
const buttonTabsConstruct = document.querySelector("#button-tabs-construct");
const resultContent = document.querySelector("#result-content");
const constructContent = document.querySelector("#construct-content");
const constructedResultsContent = document.querySelector("#constructed-results-content");
const inputQuantity = document.querySelector("#input-quantity");
const buttonGenerate = document.querySelector("#button-generate");
const buttonCopy = document.querySelector("#button-copy");
const outputContent = document.querySelector("#output-content");
const inputEntry = document.querySelector("#input-entry");
const buttonAdd = document.querySelector("#button-add");
const chartLegends = document.getElementById("chart-legends");
const resultsSection = document.getElementById("results");
const spinnerColors = ["#e87477", "#73e8ab", "#73a9e8", "#e88473", "#e873b3", "#dae873"];
let entries = ["Cherry", "Apple", "Grape"];
let myData = [];
let spinCount = 0;
let resultCount = 0;
let mode = "generate";
let constructedResults = [];

outputContent.innerHTML = '<i id="arrow" class="fas fa-caret-down"></i>';

const allSpinnerColors = () => {
	let arr = spinnerColors;
	for (let i = 0; i < 10; i++) {
		arr = [...arr, ...spinnerColors];
	}
	return arr;
};

const spin = () => {
	window.chart.options.rotation = -90 * (Math.PI / 180);
	window.chart.update();
	outputContent.innerHTML = '<i id="arrow" class="fas fa-caret-down"></i>';
	let luckyEntry = random.spinner({ entries, returnDetails: true });
	const deg = luckyEntry.deg;
	spinCount += 1;
	window.chart.options.rotation = Math.PI * -0.5 - (deg / 180) * Math.PI - Math.PI * 12 * spinCount;
	window.chart.options.animation.duration = 8000;
	window.chart.update();

	buttonGenerate.disabled = true;
	buttonAdd.disabled = true;
	inputEntry.disabled = true;
	inputEntry.value = "";
	document.querySelectorAll(".buttons-delete").forEach((item) => {
		item.classList.add("disabled");
	});

	setTimeout(() => {
		outputContent.innerHTML = luckyEntry.entry;
		buttonGenerate.disabled = false;
		buttonAdd.disabled = false;
		inputEntry.disabled = false;
		document.querySelectorAll(".buttons-delete").forEach((item) => {
			item.classList.remove("disabled");
		});
		addToResults(luckyEntry.entry);
	}, 7000);
};

const deleteEntryItem = (i) => {
	myData = [];
	entries.splice(i, 1);
	let singleData = random.spinner({ entries, returnDetails: true }).data;
	for (let entry of entries) {
		myData.push(singleData);
	}
	updateData();
};

const updateData = () => {
	window.chart.data.labels = entries;
	window.chart.data.datasets[0].data = myData;
	window.chart.options.animation.duration = 1000;
	chartLegends.innerHTML = window.chart.generateLegend();
	bindChartEvents();
	window.chart.update();
	if (entries[0]) {
		buttonGenerate.disabled = false;
		outputContent.innerHTML = '<i id="arrow" class="fas fa-caret-down"></i>';
	} else {
		buttonGenerate.disabled = true;
		outputContent.innerHTML = "";
		window.chart.options.rotation = -90 * (Math.PI / 180);
		spinCount = 0;
	}
};

const addEntryItem = () => {
	myData = [];
	if (inputEntry.value) {
		entries.push(inputEntry.value);
		let singleData = random.spinner({ entries, returnDetails: true }).data;
		for (let entry of entries) {
			myData.push(singleData);
		}

		updateData();
		inputEntry.value = "";
	} else {
		return;
	}
};

buttonAdd.addEventListener("click", addEntryItem);

buttonGenerate.addEventListener("click", () => {
	if (mode === "generate") spin();
	else if (mode === "construct") {
		if (+inputQuantity.value < 1 || typeof +inputQuantity.value != "number") inputQuantity.value = 4;
		deleteResults();
		constructedResults = random.spinner({ entries, construct: +inputQuantity.value });
		construct(constructedResults);
	}
});

const ctx = document.querySelector("#chart").getContext("2d");

window.chart = new Chart(ctx, {
	type: "pie",

	data: {
		labels: ["Cherry", "Apple", "Grape"],
		datasets: [
			{
				data: [120, 120, 120],
				backgroundColor: allSpinnerColors(),
				borderColor: "#fafbfc",
				borderWidth: 1.5,
			},
		],
	},

	options: {
		title: {
			display: false,
		},
		legend: {
			position: "bottom",
			display: false,
		},
		legendCallback: (chart) => {
			const renderLabels = (chart) => {
				const { data } = chart;
				return data.datasets[0].data
					.map(
						(_, i) =>
							`
					  		<div id="legend-${i}-item" class="legend-item">
							<span style="background-color:${data.datasets[0].backgroundColor[i]}" class="item-label"></span>
							${data.labels[i] && `<span class="item-title">${data.labels[i]}<span class="buttons-delete"><i class="fas fa-times"></i></span></span>`}
					 		 </div>
				 			`
					)
					.join("");
			};
			return `
			  ${renderLabels(chart)}
			`;
		},

		aspectRatio: 1,
		events: [],
	},
});

const bindChartEvents = () => {
	const legendItems = [...document.querySelectorAll(".buttons-delete")];
	legendItems.forEach((item, i) => {
		item.addEventListener("click", () => {
			deleteEntryItem(i);
		});
	});

	window.chart.update();
};

chartLegends.innerHTML = window.chart.generateLegend();
bindChartEvents();

buttonCopy.addEventListener("click", () => {
	if (mode === "generate") window.navigator.clipboard.writeText(resultContent.innerText);
	else if (mode === "construct") window.navigator.clipboard.writeText(constructedResults);
});

buttonTabsGenerate.addEventListener("click", () => {
	buttonCopy.style.display = "none";
	mode = "generate";
	buttonGenerate.innerText = "Generate";
	resultContent.style.display = "flex";
	constructContent.style.display = "none";
});

buttonTabsConstruct.addEventListener("click", () => {
	buttonCopy.style.display = "flex";
	mode = "construct";
	buttonGenerate.innerText = "Construct";
	resultContent.style.display = "none";
	constructContent.style.display = "flex";
});

const construct = (results) => {
	for (let result of results) {
		const allResults = document.createElement("div");
		allResults.className = "col";
		allResults.innerHTML = result;
		constructedResultsContent.appendChild(allResults);
	}
};

const deleteResults = () => {
	constructedResultsContent.innerHTML = "";
};

const addToResults = (r) => {
	resultCount++;
	const resultItem = document.createElement("div");
	resultItem.className = "results-item";
	resultItem.innerHTML = `<span>${resultCount}.</span> <span>${r}</span>`;
	resultsSection.appendChild(resultItem);
};
