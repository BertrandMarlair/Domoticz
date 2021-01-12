import DataLoader from "dataloader";

import {DBmodels} from "../../../../main";

const filterItems = (key, items) => {
    for (const item of items) {
        if (item.slug === key) {
            return item
        }
    }
};

const getBatchStatus = async keys => {
    const items = await DBmodels.Test.findAll({
        where: {
            slug: keys,
        },
    });
    
    const result = [];

    for (const key of keys) {
        let item = filterItems(key, items);

        result.push(item || null);
    }

    return result;

};

const testLoader = new DataLoader(
    keys => getBatchStatus(keys),
    {cache: false},
);

export default testLoader;