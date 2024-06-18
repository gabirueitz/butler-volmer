const chartPlace = document.getElementById("chart");
const currentInput = document.getElementById("currentRange");
const alphaInput = document.getElementById("alphaRange");
const tempInput = document.getElementById("tempRange");
const currentValue = document.getElementById("currentValue");
const alphaValue = document.getElementById("alphaValue");
const tempValue = document.getElementById("tempValue");
const resetButton = document.getElementById("reset");

const xMaxValue = 0.15;
const xStep = 0.01;
const F = 96485;
const R = 8.314;

let xData = [];
let yData = [];
let j0 = currentInput.value;
let alpha = alphaInput.value;
let T = tempInput.value;
let ja = [];
let jc = [];

currentValue.innerText = j0;
alphaValue.innerText = alpha;
tempValue.innerText = T;

for (let i = 0; i < (2 * xMaxValue) / xStep + 1; i++) {
	xData[i] = i * xStep - xMaxValue;
	xData[i] = xData[i].toFixed(2);
}

function calculateAXis(alpha, j0, T) {
	for (let i = 0; i < xData.length; i++) {
		const k = F / (R * T);
		ja[i] = j0 * Math.exp((1 - alpha) * k * xData[i]);
		jc[i] = -j0 * Math.exp(-alpha * k * xData[i]);
		yData[i] = ja[i] + jc[i];
	}
	return xData, yData, ja, jc;
}

function resetGraph() {
	j0 = 0.1;
	alpha = 0.5;
	T = 300;
	calculateAXis(alpha, j0, T);
	theChart.update();
	currentValue.innerText = j0;
	alphaValue.innerText = alpha;
	tempValue.innerText = T;
}

const theChart = new Chart(chartPlace, {
	type: "line",
	data: {
		labels: xData,
		datasets: [
			{
				label: "ja+jc",
				data: yData,
				fill: false,
				borderColor: "rgb(0, 0, 0)",
				tension: 0.1,
			},
			{
				label: "ja",
				data: ja,
				fill: false,
				borderColor: "rgba(250, 0, 0, 0.6)",
				tension: 0.1,
			},
			{
				label: "jc",
				data: jc,
				fill: false,
				borderColor: "rgba(0, 0, 250, 0.6)",
				tension: 0.1,
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		elements: {
			point: {
				radius: 0,
			},
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: "Sobrepotencial (V)",
					font: {
						family: "Poppins",
						size: 16,
						weight: "bold",
						lineHeight: 1.2,
					},
				},
				ticks: {
					font: {
						size: 15,
					},
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: "Densidade de Corrente (A/cm²)",
					font: {
						family: "Poppins",
						size: 16,
						weight: "bold",
						lineHeight: 1.2,
					},
				},
				ticks: {
					font: {
						size: 15,
					},
				},
			},
		},
		plugins: {
			legend: {
				labels: {
					padding: 25,
					font: {
						size: 16,
						weight: "bold",
					},
				},
				display: true,
			},
		},
	},
});

calculateAXis(alpha, j0, T);
resetGraph();

currentInput.addEventListener("input", function (e) {
	j0 = currentInput.value;
	calculateAXis(alpha, j0, T);
	theChart.update();
	currentValue.innerText = j0;
	return j0;
});

alphaInput.addEventListener("input", function (e) {
	alpha = alphaInput.value;
	calculateAXis(alpha, j0, T);
	theChart.update();
	alphaValue.innerText = alpha;
	return alpha;
});

tempInput.addEventListener("input", function (e) {
	T = tempInput.value;
	calculateAXis(alpha, j0, T);
	theChart.update();
	tempValue.innerText = T;
	return T;
});

resetButton.addEventListener("click", resetGraph());
