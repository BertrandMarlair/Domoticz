const menu = () => {
    return {
        head: {
            title: "Domoticz bis",
            link: "/contexttest/page",
        },
        items: [
            {
                icon: "Build",
                name: "menu.contexttest.pages",
                link: "/contexttest/page",
            },
            {
                icon: "Build",
                name: "menu.contexttest.createBlock",
                link: "/contexttest/createblock",
            },
        ],
    };
};

export default menu;
