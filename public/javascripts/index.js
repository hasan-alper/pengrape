const random = {
	number: (opts) => {
		//cant use decimal values for input min and max
		//generate x numbers
		//sort the results ascend/descend/none
		//allow duplication in results true/false
		let { min, max, type, precision } = opts || { min: 0, max: 20, type: "integer", precision: 4 };
		min = min || 0;
		max = max || 20;
		type = type || "integer";
		precision = precision || 4;

		if (type === "integer") return Math.floor(Math.random() * (max - min + 1)) + min;
		else if (type === "decimal") {
			let num = `${Math.floor(Math.random() * (max - min)) + min}.`;
			for (let i = 0; i < precision; i++) {
				num += Math.floor(Math.random() * 10).toString();
			}
			return num;
		} else return "ERROR";
	},
	color: (opts) => {
		// opacitiy toggle option
		let { format } = opts || { format: "rgb" };
		format = format || "rgb";
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

			s = Math.round(+(s * 100).toFixed(1));
			l = Math.round(+(l * 100).toFixed(1));

			return "hsl(" + h + ", " + s + "%, " + l + "%)";
		};

		const rgb = `rgb(${r}, ${g}, ${b})`;
		const hex = rgbToHex(r, g, b);
		const hsl = rgbToHsl(r, g, b);
		const all = `${hex};${rgb};${hsl}`.split(";");

		if (format === "hex") return hex;
		else if (format === "rgb") return rgb;
		else if (format === "hsl") return hsl;
		else if (format === "all") return all;
		else return "ERROR";
	},
	password: (opts) => {
		let { lowercase, uppercase, number, symbol, length } = opts || { lowercase: true, uppercase: true, number: true, symbol: true, length: 16 };

		if (lowercase !== false) lowercase = true;
		if (uppercase !== false) uppercase = true;
		if (number !== false) number = true;
		if (symbol !== false) symbol = true;
		length = length || 16;

		const lowercaseLetters = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
		const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789012345678901234567890123456789";
		const symbols = "~!@#$%&*()_-+=[]{}|<,>.?/";

		let allCharacters = "";
		if (lowercase) allCharacters += lowercaseLetters;
		if (uppercase) allCharacters += uppercaseLetters;
		if (number) allCharacters += numbers;
		if (symbol) allCharacters += symbols;
		if (!allCharacters) return "You must select at least one character set";

		let password = "";
		for (let i = 0; i < length; i++) {
			password += allCharacters[random.number({ min: 0, max: allCharacters.length - 1 })];
		}
		return password;
	},
};

export { random };
