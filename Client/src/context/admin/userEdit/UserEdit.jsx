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

const UserEdit = ({classes, user, onClose, setUser}) => {
    const [userTypeString, setUserTypeString] = useState("");
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [errorName, setErrorName] = useState(null);
    const history = useHistory();

    const {t} = useTranslation();
    const [updateUserMutation, {data, loading, error}] = useMutation(UPDATE_USER);

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
        if (data?.editUser?._id) {
            notify("Success", {
                variant: "success",
            });
            setUser(data.editUser);
            onClose();
        }
    }, [data, history, t]);

    const updateUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (name.length < 2) {
            setErrorName("Le nom doit faire plus de deux caractères");
            validation = false;
        } else {
            setErrorName("");
        }

        if (validation) {
            console.log("------edituser");
            console.log(id);
            console.log(name);
            updateUserMutation({variables: {_id: id, name: name}});
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <Title normal centered>
                    Modification {userTypeString} {user.name}
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Attention ! Cette action est irréversible. Voulez-vous vraiment supprimer cet utilisateur ?
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => updateUser(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Nom
                    </SmallTitle>
                    <Input
                        autofocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={user.name}
                        type={"text"}
                        helperText={t(errorName)}
                        error={!!errorName}
                    />
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Modifier l'utilisateur
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(UserEdit);

const UPDATE_USER = gql`
    mutation editUser($_id: ID!, $name: String!) {
        editUser(_id: $_id, name: $name) {
            _id
            name
            type
            active
            permission
            basic {
                verified
                lastLogin
            }
            createdAt
            updatedAt
        }
    }
`;
