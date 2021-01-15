import { objectType } from "nexus";
import { query } from "../../../../core/mongo";
import { DBBridges } from "../../bridge";
import PhilipsHueBridgeType from "../../bridge/type/philipsHueBridge";

const PhilipsHueType = objectType({
    name: "PhilipsHue",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("title");
        t.string("description");
        t.list.field("bridges", { 
            type: PhilipsHueBridgeType,
            async resolve(...params){
                return bridgesResolver(...params);
            }
         });
    }
});

export default PhilipsHueType;

const bridgesResolver = async  ({_id}) => {
    return query(DBBridges, {providerId: _id});
}