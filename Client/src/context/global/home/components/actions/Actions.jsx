import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ActionsStyle";
import Action from "../../../../../components/action/Action";
import SmallTitle from "../../../../../components/typography/SmallTitle";

const defaultCategories = [
    {
        id: 1,
        title: "All Lights",
        actions: [
            {
                id: 1,
                icon: "Walk",
                title: "All lights",
                iconColor: "#53BAE7",
                on: true,
            },
        ],
    },
    {
        id: 2,
        title: "Ambiances",
        actions: [
            {
                id: 1,
                icon: "Netflix",
                title: "Netflix and Chill",
                iconColor: "#D5011D",
                on: true,
            },
            {
                id: 2,
                icon: "Chandelier",
                title: "Eclairage complet",
                iconColor: "#FFBB56",
                on: true,
            },
            {
                id: 3,
                icon: "LightBulb",
                title: "Détente",
                iconColor: "#FFBB56",
                on: true,
            },
            {
                id: 4,
                icon: "TableLamp",
                title: "Stimulation",
                iconColor: "#FFBB56",
                on: true,
            },
        ],
    },
    {
        id: 3,
        title: "Temperature",
        actions: [
            {
                id: 1,
                icon: "Thermostat",
                title: "Salon",
                iconColor: "#DB8648",
                on: true,
            },
        ],
    },
];

const Actions = ({classes}) => {
    // eslint-disable-next-line no-unused-vars
    const [categories, setCategories] = useState(defaultCategories);

    const handleClick = (categoryId, actionId) => {
        const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
        const category = categories[categoryIndex];
        const actionIndex = category.actions.findIndex((act) => act.id === actionId);

        const newCategories = [
            ...categories.slice(0, categoryIndex),
            {
                ...category,
                actions: [
                    ...category.actions.slice(0, actionIndex),
                    {
                        ...category.actions[actionIndex],
                        on: !category.actions[actionIndex].on,
                    },
                    ...category.actions.slice(actionIndex + 1),
                ],
            },
            ...categories.slice(categoryIndex + 1),
        ];

        setCategories(newCategories);
    };

    return (
        <div container className={classes.root}>
            {categories.map((category) => {
                return (
                    <div className={classes.category} key={`category+${category.id}`}>
                        <SmallTitle className={classes.categoryTitle}>{category.title}</SmallTitle>
                        <div className={classes.categoryWrapper}>
                            {category.actions.map((action, index) => {
                                return (
                                    <Action
                                        key={`action/${index}`}
                                        active={action.on}
                                        onClick={() => handleClick(category.id, action.id)}
                                        title={action.title}
                                        icon={action.icon}
                                        iconColor={action.iconColor}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default withStyles(style)(Actions);
