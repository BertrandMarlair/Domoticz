import { objectType } from "nexus";

const WeatherType = objectType({
    name: "Weather",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("city");
        t.string("country");
        t.float("visibility");
        t.float("dt");
        t.float("clouds", {
            async resolve(...params){
                return cloudsResolver(...params);
            }
        });
        t.float("wind", {
            async resolve(...params){
                return windResolver(...params);
            }
        });
        t.float("humidity", {
            async resolve(...params){
                return humidityResolver(...params);
            }
        });
        t.float("temp", {
            async resolve(...params){
                return tempbridgesResolver(...params);
            }
        });
        t.float("feels_like", {
            async resolve(...params){
                return feelsLikeResolver(...params);
            }
        });
        t.float("temp_min", {
            async resolve(...params){
                return tempMinResolver(...params);
            }
        });
        t.float("temp_max", {
            async resolve(...params){
                return tempMaxResolver(...params);
            }
        });
        t.float("pressure", {
            async resolve(...params){
                return pressureResolver(...params);
            }
        });
        t.string("main", {
            async resolve(...params){
                return mainResolver(...params);
            }
        });
        t.string("description", {
            async resolve(...params){
                return descriptionResolver(...params);
            }
        });
        t.string("icon", {
            async resolve(...params){
                return iconResolver(...params);
            }
        });
    }
});

export default WeatherType;

const humidityResolver = async ({humidity, main}) => {
    return humidity ? humidity : main.humidity;
};

const cloudsResolver = async ({clouds}) => {
    return typeof clouds === "string" ? clouds : clouds.all;
};

const windResolver = async ({wind}) => {
    return typeof wind === "string" ? wind : wind.speed;
};

const tempbridgesResolver = async ({temp, main}) => {
    return temp ? temp : main.temp;
};

const feelsLikeResolver = async ({feels_like, main}) => {
    return feels_like ? feels_like : main.feels_like;
};

const tempMinResolver = async ({temp_min, main}) => {
    return temp_min ? temp_min : main.temp_min;
};

const tempMaxResolver = async ({temp_max, main}) => {
    return temp_max ? temp_max : main.temp_max;
};

const pressureResolver = async ({pressure, main}) => {
    return pressure ? pressure : main.pressure;
};

const mainResolver = async ({main, weather}) => {
    return typeof main === "string" ? main : weather?.[0]?.main;
};

const descriptionResolver = async ({description, weather}) => {
    return description ? description : weather?.[0]?.description;
};

const iconResolver = async ({icon, weather}) => {
    return icon ? icon : weather?.[0]?.icon;
};
