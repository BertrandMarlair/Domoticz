/* eslint-disable newline-after-var */
/* eslint-disable prefer-template */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable no-continue */
/* eslint-disable radix */
/* eslint-disable one-var */
const colorPointsDefault = [
    [0.675, 0.322],
    [0.4091, 0.518],
    [0.167, 0.04],
];

const convertColor = (colorMode, ...params) => {
    switch (colorMode) {
        case "xy":
            return calculateXY(...params);
        case "ct":
            return colorTemperatureToHex(...params);
    }
};

export default convertColor;

export const calculateXY = (rColor, gColor, bColor) => {
    let red = rColor / 255,
        green = gColor / 255,
        blue = bColor / 255,
        r = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4000000953674316) : red / 12.92,
        g = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4000000953674316) : green / 12.92,
        b = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4000000953674316) : blue / 12.92,
        x = r * 0.664511 + g * 0.154324 + b * 0.162028,
        y = r * 0.283881 + g * 0.668433 + b * 0.047685,
        z = r * 8.8e-5 + g * 0.07231 + b * 0.986039,
        xy = [x / (x + y + z), y / (x + y + z)];

    if (isNaN(xy[0])) {
        xy[0] = 0.0;
    }

    if (isNaN(xy[1])) {
        xy[1] = 0.0;
    }

    const colorPoints = colorPointsDefault;
    const inReachOfLamps = checkPointInLampsReach(xy, colorPoints);

    if (!inReachOfLamps) {
        let pAB = getClosestPointToPoints(colorPoints[0], colorPoints[1], xy),
            pAC = getClosestPointToPoints(colorPoints[2], colorPoints[0], xy),
            pBC = getClosestPointToPoints(colorPoints[1], colorPoints[2], xy),
            dAB = getDistanceBetweenTwoPoints(xy, pAB),
            dAC = getDistanceBetweenTwoPoints(xy, pAC),
            dBC = getDistanceBetweenTwoPoints(xy, pBC),
            lowest = dAB,
            closestPoint = pAB;

        if (dAC < dAB) {
            lowest = dAC;
            closestPoint = pAC;
        }

        if (dBC < lowest) {
            closestPoint = pBC;
        }

        xy[0] = closestPoint[0];
        xy[1] = closestPoint[1];
    }

    xy[0] = precision(xy[0]);
    xy[1] = precision(xy[1]);
    return xy;
};

const checkPointInLampsReach = (point, colorPoints) => {
    if (point != null && colorPoints != null) {
        let red = colorPoints[0],
            green = colorPoints[1],
            blue = colorPoints[2],
            v1 = [green[0] - red[0], green[1] - red[1]],
            v2 = [blue[0] - red[0], blue[1] - red[1]],
            q = [point[0] - red[0], point[1] - red[1]],
            s = crossProduct(q, v2) / crossProduct(v1, v2),
            t = crossProduct(v1, q) / crossProduct(v1, v2);

        return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
    }
    return false;
};

const crossProduct = (point1, point2) => {
    return point1[0] * point2[1] - point1[1] * point2[0];
};

const getClosestPointToPoints = (pointA, pointB, pointP) => {
    if (pointA != null && pointB != null && pointP != null) {
        let pointAP = [pointP[0] - pointA[0], pointP[1] - pointA[1]],
            pointAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]],
            ab2 = pointAB[0] * pointAB[0] + pointAB[1] * pointAB[1],
            apAb = pointAP[0] * pointAB[0] + pointAP[1] * pointAB[1],
            t = apAb / ab2;

        if (t < 0.0) {
            t = 0.0;
        } else if (t > 1.0) {
            t = 1.0;
        }

        return [pointA[0] + pointAB[0] * t, pointA[1] + pointAB[1] * t];
    }
    return null;
};

const getDistanceBetweenTwoPoints = (pointA, pointB) => {
    let dx = pointA[0] - pointB[0],
        dy = pointA[1] - pointB[1],
        dist = Math.sqrt(dx * dx + dy * dy);

    return dist;
};

const precision = (d) => {
    return Math.round(10000.0 * d) / 10000.0;
};

export const cieToRGB = (x, y, brightness = 254) => {
    let z = 1.0 - x - y,
        Y = (brightness / 254).toFixed(2),
        X = (Y / y) * x,
        Z = (Y / y) * z,
        red = X * 1.656492 - Y * 0.354851 - Z * 0.255038,
        green = -X * 0.707196 + Y * 1.655397 + Z * 0.036152,
        blue = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

    if (red > blue && red > green && red > 1.0) {
        green = green / red;
        blue = blue / red;
        red = 1.0;
    } else if (green > blue && green > red && green > 1.0) {
        red = red / green;
        blue = blue / green;
        green = 1.0;
    } else if (blue > red && blue > green && blue > 1.0) {
        red = red / blue;
        green = green / blue;
        blue = 1.0;
    }

    red = red <= 0.0031308 ? 12.92 * red : (1.0 + 0.055) * Math.pow(red, 1.0 / 2.4) - 0.055;
    green = green <= 0.0031308 ? 12.92 * green : (1.0 + 0.055) * Math.pow(green, 1.0 / 2.4) - 0.055;
    blue = blue <= 0.0031308 ? 12.92 * blue : (1.0 + 0.055) * Math.pow(blue, 1.0 / 2.4) - 0.055;

    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    if (isNaN(red)) {
        red = 0;
    }

    if (isNaN(green)) {
        green = 0;
    }

    if (isNaN(blue)) {
        blue = 0;
    }

    let decColor = 0x1000000 + blue + 0x100 * green + 0x10000 * red;

    return `#${decColor.toString(16).substr(1)}`;
};

export const colorTemperatureToHex = (mireds) => {
    let hectemp = 20000.0 / mireds,
        red,
        green,
        blue;

    if (hectemp <= 66) {
        red = 255;
        green = 99.4708025861 * Math.log(hectemp) - 161.1195681661;
        blue = hectemp <= 19 ? 0 : 138.5177312231 * Math.log(hectemp - 10) - 305.0447927307;
    } else {
        red = 329.698727446 * Math.pow(hectemp - 60, -0.1332047592);
        green = 288.1221695283 * Math.pow(hectemp - 60, -0.0755148492);
        blue = 255;
    }

    red = red > 255 ? 255 : red;
    green = green > 255 ? 255 : green;
    blue = blue > 255 ? 255 : blue;

    let decColor = 0x1000000 + parseInt(blue, 10) + 0x100 * parseInt(green, 10) + 0x10000 * parseInt(red, 10);

    return `#${decColor.toString(16).substr(1)}`;
};

export const rgbToCie = (r, g, b) => {
    let red = r > 0.04045 ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : r / 12.92,
        green = g > 0.04045 ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : g / 12.92,
        blue = b > 0.04045 ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : b / 12.92,
        X = red * 0.664511 + green * 0.154324 + blue * 0.162028,
        Y = red * 0.283881 + green * 0.668433 + blue * 0.047685,
        Z = red * 0.000088 + green * 0.07231 + blue * 0.986039,
        x = (X / (X + Y + Z)).toFixed(4),
        y = (Y / (X + Y + Z)).toFixed(4);

    if (isNaN(x)) {
        x = 0;
    }

    if (isNaN(y)) {
        y = 0;
    }

    return [parseFloat(x), parseFloat(y)];
};

const hexValueSanitize = (color) => {
    return color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b).replace("#", "");
};

const hexToDec = (hex) => {
    return parseInt(`${hex}`.replace(/[^a-f0-9]/gi, ""), 16);
};

const hexBrightness = (hex, type) => {
    let conversion;

    if (type === "BT601") {
        conversion = [0.299, 0.587, 0.114];
    } else if (type === "BT709") {
        conversion = [0.2126, 0.7152, 0.0722];
    } else if (type === "BT2020") {
        conversion = [0.2627, 0.678, 0.0593];
    } else {
        conversion = [0.299, 0.587, 0.114];
    }

    const newHex = hexValueSanitize(hex);

    return (
        hexToDec(newHex[0] + newHex[1]) * conversion[0] +
        hexToDec(newHex[2] + newHex[3]) * conversion[1] +
        hexToDec(newHex[4] + newHex[5]) * conversion[2]
    );
};

const mostBrightColor = (colors, type) => {
    let mostBright = false;

    let hex;

    colors.forEach((color) => {
        hex = hexValueSanitize(color);

        // brightness = hexBrightness(hex, type);
        if (!mostBright || hexBrightness(hex, type) > hexBrightness(mostBright, type)) {
            mostBright = hex;
        }
    });

    return `#${mostBright}`;
};

export const sortColors = (colors) => {
    const input = colors.slice(0);
    const output = [];

    while (input.length > 0) {
        const color = mostBrightColor(input);

        let index = input.indexOf(color);

        if (index > -1) {
            input.splice(index, 1);
        }
        output.push(color);
    }
    return output;
};

export const hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    const newHex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
};

export const getContrasted = (color) => {
    const {r, g, b} = hexToRgb(color);

    if (r * 0.299 + g * 0.587 + b * 0.114 > 180) {
        return "#2f2f2f";
    }

    return "white";
};
