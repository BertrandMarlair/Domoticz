import { objectType } from "nexus";

const WeatherType = objectType({
    name: "Weather",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.int("visibility");
        t.int("dt");
    }
});

export default WeatherType;