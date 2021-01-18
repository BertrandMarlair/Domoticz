import { objectType } from "nexus";
import PhilipsHueLightStateType from "./philipsHueLightState";

const PhilipsHueLightType = objectType({
    name: "PhilipsHueLight",
    definition(t) {
        t.id("bridgeId");
        t.string("name");
        t.string("type");
        t.string("modelid");
        t.string("manufacturername");
        t.string("productname");
        t.string("uniqueid");
        t.string("swversion");
        t.string("swconfigid");
        t.string("productid");
        t.field("state", {type: PhilipsHueLightStateType});
    }
});

export default PhilipsHueLightType;