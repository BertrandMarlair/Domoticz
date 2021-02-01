module.exports = {
    apps: [
        {
            name: "Ngrok",
            script: "~/ngrok/ngrok http -region=us -hostname=local.domotik.tk 80",
        },
    ],
};
