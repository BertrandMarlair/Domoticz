/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./ProviderFormStyle";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../../../components/input/Input";
import Error from "../../../../components/error/Error";
import notify from "../../../../core/snackbar/snackbar";
import Button from "../../../../components/button/Button";
import Text from "../../../../components/typography/Text";
import SmallTitle from "../../../../components/typography/SmallTitle";

const ProviderForm = ({classes, history, onClose, setProviders, option, providers}) => {
    const [title, setTitle] = useState(option?.title ?? "");
    const [errorTitle, setErrorTitle] = useState(null);
    const [description, setDescription] = useState(option?.description ?? "");
    const [errorDescription, setErrorDescription] = useState(null);
    const [slug, setSlug] = useState(option?.slug ?? "");
    const [errorSlug, setErrorSlug] = useState(null);
    const [icon, setIcon] = useState(option?.icon ?? "");
    const [errorIcon, setErrorIcon] = useState(null);
    const [button, setButton] = useState(option?.button ?? "");
    const [errorButton, setErrorButton] = useState(null);
    const editMode = option?._id;

    const {t} = useTranslation();

    const [createProvider, createProviderData] = useMutation(CREATE_PROVIDER);
    const [editProvider, editProviderData] = useMutation(EDIT_PROVIDER);

    useEffect(() => {
        if (createProviderData?.data?.createProvider?._id) {
            notify("Success", {
                variant: "success",
            });
            setProviders((e) => [...e, {...createProviderData?.data.createProvider}]);
            onClose();
        }
    }, [createProviderData, history, t]);

    useEffect(() => {
        if (editProviderData?.data?.editProvider?._id) {
            notify("Success", {
                variant: "success",
            });
            const provider = editProviderData.data.editProvider;
            const providerIndex = providers.findIndex((prov) => prov._id === provider._id);

            setProviders([...providers.slice(0, providerIndex), {...provider}, ...providers.slice(providerIndex + 1)]);
            onClose();
        }
    }, [editProviderData, history, t]);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (title.length < 2) {
            setErrorTitle("Le titre est trop court");
            validation = false;
        } else {
            setErrorTitle("");
        }
        if (description.length < 2) {
            setErrorDescription("La description est trop courte");
            validation = false;
        } else {
            setErrorDescription("");
        }
        if (slug.length < 2) {
            setErrorSlug("Le slug est trop court");
            validation = false;
        } else {
            setErrorSlug("");
        }
        if (icon.length < 2) {
            setErrorIcon("L'icon est trop court");
            validation = false;
        } else {
            setErrorIcon("");
        }

        if (button.length < 2) {
            setErrorButton("Le bouton est trop court");
            validation = false;
        } else {
            setErrorButton("");
        }

        if (validation) {
            if (editMode) {
                const input = {
                    provider: {
                        _id: option._id,
                        title,
                        description,
                        slug,
                        icon,
                        button,
                    },
                };

                editProvider({variables: input});
            } else {
                const input = {
                    provider: {
                        title,
                        description,
                        slug,
                        icon,
                        button,
                    },
                };

                createProvider({variables: input});
            }
        }
    };

    return (
        <div className={classes.wrapper}>
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
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Button
                    </SmallTitle>
                    <Input
                        value={button}
                        onChange={(e) => setButton(e.target.value)}
                        placeholder="Entrez le nom du boutton"
                        type="text"
                        helperText={t(errorButton)}
                        error={!!errorButton}
                    />
                </div>
                <Error errorMessage={createProviderData?.error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={createProviderData?.loading}>
                        {editMode ? "Editer le provider" : "Créer le provider"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(ProviderForm);

const CREATE_PROVIDER = gql`
    mutation createProvider($provider: createProviderInput!) {
        createProvider(provider: $provider) {
            _id
            title
            slug
            button
            icon
            description
        }
    }
`;

const EDIT_PROVIDER = gql`
    mutation editProvider($provider: editProviderInput!) {
        editProvider(provider: $provider) {
            _id
            title
            slug
            button
            icon
            description
        }
    }
`;
