import axios from "axios";

export const HueBridgeConnection = async (ipAddress) => {
    const res = await new Promise((resolve) => {
        axios({
            method: "GET",
            url: `http://${ipAddress}/api/config/swupdate`,
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

export const HueBridgeRegister = async (ipAddress, name) => {
    const res = await new Promise((resolve) => {
        axios({
            method: "POST",
            url: `http://${ipAddress}/api`,
            data: {'devicetype': name}
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