import { CONFIG_HOST, CONFIG_PORT, NEEDED_ENV } from "../constants";
import {wait} from "../utils/misc";
import fetch from "node-fetch";

export default async () => {
    if(process.env.INTERNAL === "true") {
        return true;
    }

    let maxReconnect = 20,
    connected = false,
    envVariables = null;
    
    const params = {
        env: NEEDED_ENV,
    }
    
    while (!connected && maxReconnect) {
        if(maxReconnect === 100){
            throw new Error("Fail to get config env, stop server")
        }
        try {
            envVariables = await fetch(
                `http://${CONFIG_HOST}:${CONFIG_PORT}/config`, 
                {  
                    method: 'post', 
                    body: JSON.stringify(params), 
                    headers: { 'Content-Type': 'application/json' },
                }
            )  
            .then((res) => {
                connected = true
                return res
            })
            .then((res) => res.json())
        } catch (err) {
            console.error(`${err.message}: reconnecting in 5 seconds`);
            maxReconnect--;
            await wait(5000);
        }
    }
    if (!connected) {
        return null;
    }

    envVariables.forEach(params => {
        process.env[params.name] = params.value
    })

    return envVariables
};