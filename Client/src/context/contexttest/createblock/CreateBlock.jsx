import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import {withStyles} from "@material-ui/core";
import style from "./CreateBlockStyle";

import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/react-hooks";

import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";

const CreateBlock = ({classes}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errors, setErrors] = useState(null);

    const {t} = useTranslation();

    const [createBlockMutation, {data, error, loading}] = useMutation(CREATE_BLOCK);

    useEffect(() => {
        if (data?.block?._id) {
            notify(t("contexttest.createBlock.success.createBlock"), {
                variant: "success",
            });
        }
        if (error) {
            setErrors("contexttest.createBlock.errors.failCreateBlock");
        }
    }, [data, history, t]);

    const createBlock = (e) => {
        e.preventDefault();
        let validation = true;

        if (title.length < 2) {
            setErrorTitle("contexttest.createBlock.errors.invalidTitle");
            validation = false;
        } else {
            setErrorTitle("");
        }

        if (validation) {
            const input = {
                title,
                description,
            };

            createBlockMutation({variables: {...input}});
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    <div className={classes.title}>
                        <Title normal centered>
                            {t("contexttest.createBlock.title")}
                        </Title>
                    </div>
                    <form className={classes.form} onSubmit={(e) => createBlock(e)}>
                        <div className={classes.inputTitle}>
                            <SmallTitle bold className={classes.label}>
                                {t("contexttest.createBlock.title.nameInputTitle")}
                            </SmallTitle>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t("contexttest.createBlock.title.nameInputLabel")}
                                autoComplete={"title"}
                                type={"text"}
                                helperText={t(errorTitle)}
                                error={!!errorTitle}
                            />
                        </div>
                        <div className={classes.inputDescription}>
                            <SmallTitle bold className={classes.label}>
                                {t("contexttest.createBlock.description.nameInputTitle")}
                            </SmallTitle>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t("contexttest.createBlock.description.nameInputLabel")}
                                autoComplete={"description"}
                                type={"text"}
                            />
                        </div>
                        <div className={classes.submit}>
                            {<Error errorMessage={error || t(errors)} />}
                            <div className={classes.formFooter}>
                                <Button noMargin size="lg" loading={loading} type="submit">
                                    {t("contexttest.createBlock.submit")}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(CreateBlock);

const CREATE_BLOCK = gql`
    mutation CreateBlock($title: String!, $description: String) {
        createBlock(block: {title: $title, description: $description}) {
            title
        }
    }
`;
