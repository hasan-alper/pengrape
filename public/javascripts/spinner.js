import { random } from "/static/javascripts/index.js";

const button = document.querySelector("#button");
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const add = document.querySelector("#add");
const chartLegends = document.getElementById("chart-legends");
let entries = [];
let myData;
let spinCount = 0;

button.disabled = true;

const spin = () => {
	window.chart.options.rotation = -90 * (Math.PI / 180);
	window.chart.update();
	output.innerHTML = "-";
	let luckyEntry = random.spinner({ entries, returnDeg: true });
	const deg = luckyEntry.pop();
	[luckyEntry] = luckyEntry;
	spinCount += 1;
	window.chart.options.rotation = Math.PI * -0.5 - (deg / 180) * Math.PI - Math.PI * 12 * spinCount;
	window.chart.options.animation.duration = 8000;
	window.chart.update();

	button.disabled = true;
	add.disabled = true;
	input.disabled = true;
	input.value = "";
	document.querySelectorAll(".delete-button").forEach((item) => {
		item.disabled = true;
	});

	setTimeout(() => {
		output.innerHTML = luckyEntry.entry;
		button.disabled = false;
		add.disabled = false;
		input.disabled = false;
		document.querySelectorAll(".delete-button").forEach((item) => {
			item.disabled = false;
		});
	}, 7000);
};

const deleteEntryItem = (i) => {
	entries.splice(i, 1);
	myData = random.spinner({ entries, returnData: true });
	updateData();
};

const updateData = () => {
	window.chart.data.labels = entries;
	window.chart.data.datasets[0].data = myData;
	window.chart.options.animation.duration = 1000;
	chartLegends.innerHTML = window.chart.generateLegend();
	bindChartEvents();
	window.chart.update();
	entries[0] ? (button.disabled = false) : (button.disabled = true);
	output.innerHTML = "-";
};

const addEntryItem = () => {
	if (input.value) {
		entries.push(input.value);
		myData = random.spinner({ entries, returnData: true });
		updateData();
		input.value = "";
	} else {
		return;
	}
};

add.addEventListener("click", addEntryItem);

button.addEventListener("click", spin);

const ctx = document.getElementById("chart").getContext("2d");

window.chart = new Chart(ctx, {
	type: "pie",

	data: {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: ["#FFC1C1", "#C6FFC1", "#C1E5FF", "#FFFDC1", "#FFC1FD", "#FFDFC1"],
				borderColor: "#808080",
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
							${data.labels[i] && `<span class="item-title">${data.labels[i]}<a class="delete-button"><i class="fas fa-times"></i></a></span>`}
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
	const legendItems = [...document.querySelectorAll(".delete-button")];
	legendItems.forEach((item, i) => {
		item.addEventListener("click", () => {
			deleteEntryItem(i);
		});
	});

	window.chart.update();
};
