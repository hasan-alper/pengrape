const random = {
	number: (opts) => {
		// default required
		// odd even option
		const { min, max } = opts;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	color: (opts) => {
		// opacitiy toggle option
		const { type } = opts;
		const r = random.number({ min: 0, max: 255 });
		const g = random.number({ min: 0, max: 255 });
		const b = random.number({ min: 0, max: 255 });

		const rgbToHex = (r, g, b) => {
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		};

		const rgbToHsl = (r, g, b) => {
			r /= 255;
			g /= 255;
			b /= 255;

			let cmin = Math.min(r, g, b),
				cmax = Math.max(r, g, b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				l = 0;

			if (delta == 0) h = 0;
			else if (cmax == r) h = ((g - b) / delta) % 6;
			else if (cmax == g) h = (b - r) / delta + 2;
			else h = (r - g) / delta + 4;

			h = Math.round(h * 60);

			if (h < 0) h += 360;
			l = (cmax + cmin) / 2;

			s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

			s = +(s * 100).toFixed(1);
			l = +(l * 100).toFixed(1);

			return "hsl(" + h + ", " + s + "%, " + l + "%)";
		};

		const rgb = `rgb(${r}, ${g}, ${b})`;
		const hex = rgbToHex(r, g, b);
		const hsl = rgbToHsl(r, g, b);

		if (type === "hex") return hex;
		else if (type === "rgb") return rgb;
		else if (type === "hsl") return hsl;
		else return "ERROR";
	},
};

export { random };
