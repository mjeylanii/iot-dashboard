export const chartOptionsGenerator = (type?: string) => {
	return {
		plugins: {
			legend: {
				display: type === 'net' ? true : false,
			},
			tooltip: {
				enabled: type === 'net' ? true : false,
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
			enabled: type == 'net' ? true : false,
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
				display: type === 'net' ? true : false,
				grid: {
					display: type === 'net' ? true : false,
				},
				ticks: {
					display: true,
					min: 0,
					max: 60,
				},
			},
		},
	};
};
