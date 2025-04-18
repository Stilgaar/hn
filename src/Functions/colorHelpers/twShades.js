export function twShades(color, makeShades = true) {
    // If CSS var, no shades will be generated! Instead, it will return
    // an RGB color string that supports TailwindCSS opacity values
    if (color.startsWith("--")) {
        return `rgb(var(${color}) / <alpha-value>)`;
    }

    const baseColor = parseColor(color);
    validateColor(baseColor);

    if (!makeShades) {
        return `rgb(${baseColor[0]} ${baseColor[1]} ${baseColor[2]} / <alpha-value>)`;
    }

    const black = [0, 0, 0];
    const white = [255, 255, 255];
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    const result = {};

    for (const shade of shades) {
        if (shade === 500) {
            result[shade] = formatColor(baseColor);
        } else {
            const isDarkShade = shade > 500;
            const adjustedShade = isDarkShade ? shade - 500 : shade;
            const percentage = adjustedShade / 500;
            const startColor = isDarkShade ? black : baseColor;
            const endColor = isDarkShade ? baseColor : white;
            const shadedColor = getColor(percentage, startColor, endColor);
            result[shade] = formatColor(shadedColor);
        }
    }

    return result;
}

/**
 * Parse the given color string and convert it to RGB format.
 * @param color The color value to parse.
 * @returns An array containing RGB values [r, g, b].
 * @throws If the color format is not recognized or invalid.
 */
function parseColor(color) {
    if (color.startsWith("#")) {
        return hexToRgbArray(color);
    } else if (color.startsWith("rgb(")) {
        return parseRgbString(color);
    } else if (color.startsWith("hsl(")) {
        return hslToRgbArray(color);
    } else {
        throw new Error(`Unsupported color format: ${color}`);
    }
}

/**
 * Validate the RGB color values.
 * @param rgb An array containing RGB values [r, g, b].
 * @throws If any RGB value is out of the valid range [0-255].
 */
function validateColor(rgb) {
    if (rgb.some(value => value < 0 || value > 255)) {
        throw new Error(`Invalid RGB color: ${rgb}`);
    }
}

/**
 * Convert a hex color string to an RGB array.
 * @param hex The hex color string (e.g., "#ffffff").
 * @returns An array containing RGB values [r, g, b].
 * @throws If the hex color string is invalid.
 */
function hexToRgbArray(hex) {
    let processedHex = hex.replace('#', '');
    if (processedHex.length === 3) {
        processedHex = processedHex.split('').map(char => char + char).join('');
    } else if (processedHex.length !== 6) {
        throw new Error(`Invalid hex color provided: ${hex}`);
    }

    return [
        parseInt(processedHex.substring(0, 2), 16),
        parseInt(processedHex.substring(2, 4), 16),
        parseInt(processedHex.substring(4, 6), 16),
    ];
}

/**
 * Parse an RGB color string and convert it to an RGB array.
 * @param rgbString The RGB color string (e.g., "rgb(255, 255, 255)").
 * @returns An array containing RGB values [r, g, b].
 * @throws If the RGB color string is invalid.
 */
function parseRgbString(rgbString) {
    const rgbRegex = /^rgb\s*\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*\)$/;
    const match = rgbString.match(rgbRegex);

    if (!match) {
        throw new Error(`Invalid RGB color provided: ${rgbString}`);
    }

    return match.slice(1).map(Number);
}

/**
 * Parse an HSL color string and convert it to an RGB array.
 * @param hslString The HSL color string (e.g., "hsl(240, 100%, 50%)").
 * @returns An array containing RGB values [r, g, b].
 * @throws If the HSL color string is invalid.
 */
function hslToRgbArray(hslString) {
    const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    const match = hslString.match(hslRegex);

    if (!match) {
        throw new Error(`Invalid HSL color provided: ${hslString}`);
    }

    let [h, s, l] = match.slice(1).map(Number);
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Format RGB values into an RGB color string.
 * @param rgb An array containing RGB values [r, g, b].
 * @returns The RGB color string (e.g., "rgb(255, 255, 255)").
 */
function formatColor(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * Calculate a color between two RGB colors based on a percentage.
 * @param percentage The percentage of the color transition (0 to 1).
 * @param start The starting RGB color [r, g, b].
 * @param end The ending RGB color [r, g, b].
 * @returns The RGB color array at the specified percentage.
 */
function getColor(percentage, start, end) {
    return end.map((channel, index) => {
        return Math.round(channel + percentage * (start[index] - channel));
    });
}
