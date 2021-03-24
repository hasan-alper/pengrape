const random = {
	number: (opts) => {
		// default required
		// odd even option
		const { min, max } = opts;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
};

export { random };
