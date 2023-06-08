export function getContrastColor(color: string): '#FFFFFF' | '#000000' {
	let hexColor: string;

	// Verifica o formato da cor fornecida
	if (color.startsWith('#')) {
		hexColor = color.replace('#', '');
	} else if (color.startsWith('rgb')) {
		const match = color.match(/\((.*)\)/);
		if (match) {
			const rgbValues = match[1].split(',').map((value) => parseInt(value.trim()));
			hexColor = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
		} else {
			throw new Error('Formato inválido para cor RGB ou RGBA.');
		}
	} else {
		throw new Error('Formato de cor não suportado. Utilize HEX, RGB ou RGBA.');
	}

	const red = parseInt(hexColor.substring(0, 2), 16);
	const green = parseInt(hexColor.substring(2, 4), 16);
	const blue = parseInt(hexColor.substring(4, 6), 16);

	const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

	return brightness >= 130 ? '#000000' : '#FFFFFF';
}

function rgbToHex(red: number, green: number, blue: number): string {
	const toHex = (value: number) => {
		const hex = value.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return '#' + toHex(red) + toHex(green) + toHex(blue);
}
