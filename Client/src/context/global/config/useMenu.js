const menu = () => {
    return {
        head: {
            title: "Domoticz",
            link: "/app/application",
        },
        items: [
            {
                icon: "Build",
                name: "menu.global.applications",
                link: "/app/application",
            },
            {
                icon: "Build",
                name: "menu.global.tests",
                link: "/app/test",
            },
            {
                icon: "Build",
                name: "menu.contexttest.page",
                link: "/contexttest/page",
            },
        ],
    };
};

export default menu;
