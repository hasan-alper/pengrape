import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const entrySection = document.querySelector("#entry-div");
const add = document.querySelector("#add");
let entries = [];
let myData;
let spinCount = 0;

const spin = () => {
	window.chart.options.rotation = -90 * (Math.PI / 180);
	window.chart.update();
	let luckyEntry = random.spinner({ entries, returnDeg: true });
	const deg = luckyEntry.pop();
	[luckyEntry] = luckyEntry;
	spinCount += 1;

	window.chart.options.rotation = Math.PI * -0.5 - (deg / 180) * Math.PI - Math.PI * 10 * spinCount;
	window.chart.options.animation.duration = 10000;
	window.chart.update();

	output.innerHTML = luckyEntry.entry;
};

const updateData = () => {
	window.chart.data.labels = entries;
	window.chart.data.datasets[0].data = myData;
	window.chart.options.animation.duration = 1000;
	window.chart.update();
};

const deleteEntryItem = (item) => {
	const target = item.target;
	target.parentElement.remove();
	const index = entries.findIndex((entry) => entry === target.previousElementSibling.innerHTML);
	entries.splice(index, 1);
	myData = random.spinner({ entries, returnData: true });
	updateData();
};

const addEntryItem = () => {
	const entryOutput = document.createElement("h5");
	entryOutput.innerHTML = input.value;

	window.entryDelete = document.createElement("input");
	entryDelete.type = "button";
	entryDelete.value = "x";

	const entryItem = document.createElement("div");
	entryItem.appendChild(entryOutput);
	entryItem.appendChild(entryDelete);
	entrySection.appendChild(entryItem);

	window.entryDelete.addEventListener("click", deleteEntryItem);

	entries.push(input.value);

	myData = random.spinner({ entries, returnData: true });

	updateData();

	input.value = "";
};

add.addEventListener("click", addEntryItem);

button.addEventListener("click", spin);

const wheel = document.getElementById("chart");
const ctx = wheel.getContext("2d");
window.chart = new Chart(ctx, {
	type: "pie",

	data: {
		labels: [],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
				data: [1],
			},
		],
	},

	options: {
		responsive: false,
		animation: {
			duration: 1000,
		},
	},
});
