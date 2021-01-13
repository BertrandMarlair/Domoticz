/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./AddProviderFormStyle";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../../../components/input/Input";
import Error from "../../../../components/error/Error";
import notify from "../../../../core/snackbar/snackbar";
import Button from "../../../../components/button/Button";
import Text from "../../../../components/typography/Text";
import Title from "../../../../components/typography/Title";
import SmallTitle from "../../../../components/typography/SmallTitle";

const AddProviderForm = ({classes, history, onClose, setProviders}) => {
    const [title, setTitle] = useState("");
    const [errorTitle, setErrorTitle] = useState(null);
    const [description, setDescription] = useState("");
    const [errorDescription, setErrorDescription] = useState(null);
    const [slug, setSlug] = useState("");
    const [errorSlug, setErrorSlug] = useState(null);
    const [icon, setIcon] = useState("");
    const [errorIcon, setErrorIcon] = useState(null);

    const {t} = useTranslation();

    const [createProviderMutation, {data, error, loading}] = useMutation(CREATE_PROVIDER);

    useEffect(() => {
        console.log(data);
        if (data?.createProvider?._id) {
            notify(t("connect.signin.success.signin"), {
                variant: "success",
            });
            setProviders((e) => [...e, {...data.createProvider}]);
            onClose();
        }
    }, [data, history, t]);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (title.length < 2) {
            setErrorTitle("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorTitle("");
        }
        if (description.length < 2) {
            setErrorDescription("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorDescription("");
        }
        if (slug.length < 2) {
            setErrorSlug("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorSlug("");
        }
        if (icon.length < 2) {
            setErrorIcon("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorIcon("");
        }

        if (validation) {
            const input = {
                provider: {
                    title,
                    description,
                    slug,
                    icon,
                },
            };

            createProviderMutation({variables: input});
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <Title normal centered>
                    Creation d'un provider
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Le provider est le point central d'un device domotique pour la maison. Ils sont centralisé par un
                    provider. Sélectionnez le provider correspondant à votre appareil. Faites attention lors de la
                    creation. Si vous n'êtes pas certain de ce que vous faite, contacté un admin
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => createUser(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Titre
                    </SmallTitle>
                    <Input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Entrez un titre"
                        type="text"
                        helperText={t(errorTitle)}
                        error={!!errorTitle}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Slug
                    </SmallTitle>
                    <Input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Entrez un slug"
                        type="text"
                        helperText={t(errorSlug)}
                        error={!!errorSlug}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Description
                    </SmallTitle>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrez une description"
                        type="text"
                        helperText={t(errorDescription)}
                        error={!!errorDescription}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Icon
                    </SmallTitle>
                    <Input
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="Entrez un icon"
                        type="text"
                        helperText={t(errorIcon)}
                        error={!!errorIcon}
                    />
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Créer le provider
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(AddProviderForm);

const CREATE_PROVIDER = gql`
    mutation createProvider($provider: createProviderInput!) {
        createProvider(provider: $provider) {
            _id
            title
            slug
            description
        }
    }
`;
