import { objectType } from "nexus";
import { queryOne } from "../../../../core/mongo";
import PhilipsHueType from "../../philipsHue/type/philipsHue";
import { DBProvider } from "../../provider";

const SyncAllType = objectType({
    name: "SyncAll",
    definition(t) {
        t.field("philipsHue",  {
            type: PhilipsHueType,
            async resolve(...params){
                return philipsHueResolver(...params);
            }
        });
    }
});

export default SyncAllType;

const philipsHueResolver = async ({philipsHue}) => {
    return philipsHue ?? await queryOne(DBProvider, {slug: "philips_hue"});
}