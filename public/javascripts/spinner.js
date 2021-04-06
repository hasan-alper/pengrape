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
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
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
							`<li>
					  		<div id="legend-${i}-item" class="legend-item">
							<span style="background-color:
						  	${data.datasets[0].backgroundColor[i]}">
						  	&nbsp;&nbsp;&nbsp;&nbsp;
							</span>
							${data.labels[i] && `<span>&nbsp;&nbsp;${data.labels[i]}</span>`}
							<input type="button" class="delete-button" value="x"/>
					 		 </div>
				 			 </li>`
					)
					.join("");
			};
			return `
			<ul class="chartjs-legend">
			  ${renderLabels(chart)}
			</ul>`;
		},
		responsive: false,
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
