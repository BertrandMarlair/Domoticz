/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./UserEditStyle";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import {useHistory} from "react-router-dom";
import Text from "../../../components/typography/Text";

const UserEdit = ({classes, user}) => {
    const [userTypeString, setUserTypeString] = useState("");
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [errorName, setErrorName] = useState(null);
    const history = useHistory();

    const {t} = useTranslation();
    const [deleteUserMutation, {data, loading, error}] = useMutation(DELETE_USER);

    useEffect(() => {
        if (user.type === "user") {
            setUserTypeString(`de l'utilisateur`);
        } else if (user.type === "device") {
            setUserTypeString(`du device`);
        }
        if (user?._id) {
            setId(user._id);
        }
    });

    useEffect(() => {
        if (data?.deleteUser?._id) {
            notify("Success", {
                variant: "success",
            });
            history.push(`/admin/users`);
        }
    }, [data, history, t]);

    const deleteUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (name !== user.name) {
            setErrorName("Le nom de l'utilisateur est incorrect.");
            validation = false;
        } else {
            setErrorName("");
        }

        if (validation) {
            deleteUserMutation({variables: {_id: id, name: name}});
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <Title normal centered>
                    Suppression {userTypeString} {user.name}
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Attention ! Cette action est irréversible. Voulez-vous vraiment supprimer cet utilisateur ?
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => deleteUser(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Confirmer le nom de l'utilisateur à supprimer
                    </SmallTitle>
                    <Input
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Entrer le nom"
                        type="text"
                        helperText={t(errorName)}
                        error={!!errorName}
                    />
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Supprimer l'utilisateur
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(UserEdit);

const DELETE_USER = gql`
    mutation deleteUser($_id: ID!, $name: String!) {
        deleteUser(_id: $_id, name: $name) {
            _id
            name
        }
    }
`;
