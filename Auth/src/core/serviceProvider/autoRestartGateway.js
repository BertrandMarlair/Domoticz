import Redis from "ioredis";

const {REDIS_HOST, REDIS_PORT} = process.env;

export const pub = () => {
    console.log("REDIS_PORT, REDIS_HOST", REDIS_PORT, REDIS_HOST);
    return new Redis(REDIS_PORT, REDIS_HOST);
} 

export const autoRestartGateway = () => {
    pub().publish("updateServer", "Restart Portal API");
};
