import { DBProvider } from "../../provider";
import { queryOne } from "../../../../core/mongo";
import SyncAllType from "../type/syncAll";

export default (t) => 
    t.field("syncAll", {
        type: SyncAllType,
        nullable: true,
        async resolve(...params) {
            return await syncAll(...params)
        },
    });


const syncAll = async () => {
    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    return {
        philipsHue,
    }
}