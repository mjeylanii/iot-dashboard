export const netOptions = {
	plugins: {
		legend: {
			display: true
		},
		tooltip: {
			enabled: true,
			mode: 'index',
			intersect: false
		}
	},
	maintainAspectRatio: false,
	hover: {
		mode: 'index',
		intersec: false
	},
	legend: {
		display: true
	},
	tooltips: {
		enabled: true,
		mode: 'index',
		intersect: false
	},
	elements: {
		point: {
			radius: 0
		},
		line: {
			tension: 0.5
		}
	},

	scales: {
		y: {
			display: true,
			grid: {
				display: true
			},
			ticks: {
				display: true,
				min: 0,
				max: true
			}
		},
		x: {
			display: true,
			grid: {
				display: true
			},
			ticks: {
				display: true,
				min: 0,
				max: 60
			}
		}
	}
};
