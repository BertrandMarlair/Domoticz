import { objectType } from "nexus";
import PhilipsHueBridgeConfigType from "./philipsHueBridgeConfig";
import PhilipsHueGroupsType from "../groups/philipsHueGroups";

const PhilipsHueBridgeType = objectType({
    name: "PhilipsHueBridge",
    definition(t) {
        t.id("_id");
        t.id("providerId");
        t.string("ipAddress");
        t.string("token", {nullable: true});
        t.field("config", {type: PhilipsHueBridgeConfigType})
        t.list.field("groups", {
            type: PhilipsHueGroupsType, 
            async resolve(...params){
                return groupsResolver(...params);
            }
        })
    }
});

export default PhilipsHueBridgeType;

const groupsResolver = async ({_id, groups}) => {
    return Object.values(groups).map((g) => ({...g, bridgeId: _id}));
}