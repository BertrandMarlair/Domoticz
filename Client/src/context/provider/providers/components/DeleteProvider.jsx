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
import Title from "../../../../components/typography/Title";
import SmallTitle from "../../../../components/typography/SmallTitle";

const DeleteProvider = ({classes, onClose, option, providers, setProviders}) => {
    const {t} = useTranslation();
    const [title, setTitle] = useState();
    const [errorTitle, setErrorTitle] = useState();

    const [deleteProvider, deleteProviderData] = useMutation(DELETE_PROVIDER);

    useEffect(() => {
        if (deleteProviderData?.data?.deleteProvider?._id) {
            notify("Success", {
                variant: "success",
            });
            const provider = deleteProviderData.data.deleteProvider;
            const providerIndex = providers.findIndex((prov) => prov._id === provider._id);

            setProviders([...providers.slice(0, providerIndex), ...providers.slice(providerIndex + 1)]);
            onClose();
        }
    }, [deleteProviderData, history, t]);

    const deleteProviderForm = (e) => {
        e.preventDefault();
        let validation = true;

        if (title !== option.title) {
            setErrorTitle("Les titres ne correspondent pas");
            validation = false;
        } else {
            setErrorTitle("");
        }

        if (validation) {
            deleteProvider({variables: {_id: option._id}});
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <Title normal centered>
                    Suppression de {option?.title}
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Si vous supprimer le provider vous devrez le reconfigurer si vous souhaiter le remettre à therme.
                    Faite attention. Confirmer le avec le nom du provider.
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => deleteProviderForm(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Titre du provider à supprimer
                    </SmallTitle>
                    <Input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre du provider"
                        type="text"
                        helperText={t(errorTitle)}
                        error={!!errorTitle}
                    />
                </div>
                <Error errorMessage={deleteProviderData?.error} />
                <div className={classes.formFooter}>
                    <Button
                        noMargin
                        fullWidth
                        size="lg"
                        type="submit"
                        color="error"
                        loading={deleteProviderData?.loading}>
                        Supprimer le provider
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(DeleteProvider);

const DELETE_PROVIDER = gql`
    mutation deleteProvider($_id: ID!) {
        deleteProvider(_id: $_id) {
            _id
        }
    }
`;
