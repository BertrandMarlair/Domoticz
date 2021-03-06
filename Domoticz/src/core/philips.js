import axios from "axios";
import { DBProvider } from "../schema/models/provider";
import { queryOne, query } from "./mongo";
import memoize from "memoizee";
import { DBBridges } from "../schema/models/philipsHue";
import { ObjectId } from "mongodb";
import { MAX_TIMEOUT } from "./constants";

const getProvider = () => queryOne(DBProvider, {slug: "philips_hue"});

const memoized = memoize(getProvider);

const httpClient = axios.create();
httpClient.defaults.timeout = MAX_TIMEOUT;

export const HueBridgeConnection = async (ipAddress) => {
    const res = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'))
        }, 2000);

        axios({
            method: "GET",
            url: `http://${ipAddress}/api/config/swupdate`,
        })
            .then((res) => {
                clearTimeout(timer)
                resolve(res);
            })
            .catch((error) => {
                clearTimeout(timer)
                resolve({...error, error: true});
            });
        });
        
    return res;
};

export const HueBridgeRegister = async (ipAddress, name) => {
    const res = await new Promise((resolve) => {
        axios({
            method: "POST",
            url: `http://${ipAddress}/api`,
            data: {'devicetype': name},
        })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                resolve({...error, error: true});
            });
    });

    return res;
};

export const QueryAllHueBridge = async (method = "GET", api = "", data) => {
    const provider = await memoized();

    if (provider) {
        const bridges = await query(DBBridges, {providerId: new ObjectId(provider._id)}) ;
    
        let promises = [];

        for (let bridge of bridges) {
            promises.push(new Promise((resolve) => {
                axios({
                    method,
                    url: `http://${bridge.ipAddress}/api/${bridge.token}/${api}`,
                    data
                })
                    .then((res) => resolve({...res, _id: bridge._id}))
                    .catch((error) => resolve({...error, error: true}));
            }))
        }

        return Promise.allSettled(promises).then((values) => values);
    }
    throw new Error("Provider not found");
};

export const QueryHueBridge = async (method = "GET", api = "", bridge, data) => {
    if (bridge?.ipAddress && bridge?.token) {
        try {
            const res = await axios({
                method,
                url: `http://${bridge.ipAddress}/api/${bridge.token}/${api}`,
                data
            })

            if (res?.data?.length > 0) {
                for (let data of res?.data) {
                    console.log(data);
                    if (data?.error) {
                        throw new Error(data.error.description);
                    }
                }
            }
    
            return res;
        } catch (e) {
            throw new Error(e);
        }
    }
    throw new Error("parameters are missing");
};