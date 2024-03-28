export const psiOptions = {
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false,
			mode: 'index',
			intersect: false,
		},
	},
	maintainAspectRatio: false,
	hover: {
		mode: 'index',
		intersec: false,
	},
	legend: {
		display: false,
	},
	tooltips: {
		enabled: false,
		mode: 'index',
		intersect: false,
	},
	elements: {
		point: {
			radius: 0,
		},
		line: {
			tension: 0.5,
		},
	},

	scales: {
		y: {
			display: false,
			grid: {
				display: false,
			},
			ticks: {
				display: true,
				min: 0,
				max: false,
			},
		},
		x: {
			display: false,
			grid: {
				display: false,
			},
			ticks: {
				display: true,
				min: 0,
				max: 60,
			},
		},
	},
};
