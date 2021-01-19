const colorPointsDefault = [
    [1.0, 0.0],
    [0.0, 1.0],
    [0.0, 0.0],
];

const calculateXY = (rColor, gColor, bColor) => {
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

export default calculateXY;
