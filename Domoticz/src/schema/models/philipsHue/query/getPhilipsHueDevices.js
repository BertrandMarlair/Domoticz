import { DBProvider } from "../../provider";
import { queryOne } from "../../../../core/mongo";
import PhilipsHueType from "../type/philipsHue";

export default (t) => 
    t.field("getPhilipsHueDevices", {
        type: PhilipsHueType,
        nullable: true,
        async resolve(...params) {
            return await getPhilipsHueDevices(...params)
        },
    });


const getPhilipsHueDevices = async () => {
    return await queryOne(DBProvider, {slug: "philips_hue"});
}