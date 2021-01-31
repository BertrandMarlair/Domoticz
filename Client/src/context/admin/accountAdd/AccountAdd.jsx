/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./AccountAddStyle";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import Select from "../../../components/select/Select";
import {useHistory} from "react-router-dom";

const AddAccount = ({classes}) => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [type, setType] = useState("");
    const [errorType, setErrorType] = useState(null);
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
    const history = useHistory();

    const {t} = useTranslation();

    const [createAccountMutation, {data, error, loading}] = useMutation(CREATE_USER);

    useEffect(() => {
        if (data?.signin?._id) {
            notify("Success", {
                variant: "success",
            });
            history.push(`/admin/account/${data.signin._id}`);
        }
    }, [data, history, t]);

    const createAccount = (e) => {
        e.preventDefault();
        let validation = true;

        if (name.length < 2) {
            setErrorName("Le titre est trop court");
            validation = false;
        } else {
            setErrorName("");
        }
        if (!type) {
            setErrorType("connect.register.errors.invalidType");
            validation = false;
        } else {
            setErrorType("");
        }
        if (password.length < 5) {
            setErrorPassword("connect.register.errors.invalidPassword");
            validation = false;
        } else {
            setErrorPassword("");
        }
        if (confirmPassword.length < 5) {
            setErrorConfirmPassword("connect.register.errors.invalidConfirmPasswordShort");
            validation = false;
        } else {
            setErrorConfirmPassword("");
        }
        if (confirmPassword !== password) {
            setErrorConfirmPassword("connect.register.errors.invalidConfirmPassword");
            validation = false;
        } else {
            setErrorConfirmPassword("");
        }

        if (validation) {
            const input = {
                name,
                type,
                password,
                passwordConfirmation: confirmPassword,
            };

            createAccountMutation({variables: {...input}});
        }
    };

    const options = [
        {
            value: "user",
            label: "User",
        },
        {
            value: "device",
            label: "Device",
        },
    ];

    return (
        <div className={classes.wrapperModal}>
            <div className={classes.title}>
                <Title normal centered>
                    Creation d'un compte
                </Title>
            </div>
            <form className={classes.form} onSubmit={(e) => createAccount(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Nom
                    </SmallTitle>
                    <Input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Entrez un nom"
                        type="text"
                        helperText={t(errorName)}
                        error={!!errorName}
                    />
                </div>
                <div className={classes.input}>
                    <div className={classes.inputType}>
                        <SmallTitle color="label" className={classes.label}>
                            {t("connect.signin.typeInputTitle")}
                        </SmallTitle>
                        <Select
                            placeholder="Sélectionner un type"
                            options={options}
                            error={!!errorType}
                            isClearable={false}
                            onChange={(e) => setType(e.value)}
                            isSearchable={false}
                            inputValue=""
                        />
                    </div>
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        {t("connect.signin.passwordInputTitle")}
                    </SmallTitle>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        type={"password"}
                        helperText={t(errorPassword)}
                        error={!!errorPassword}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        {t("connect.signin.confirmPasswordInputTitle")}
                    </SmallTitle>
                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t("connect.signin.confirmPasswordInputLabel")}
                        type={"password"}
                        helperText={t(errorConfirmPassword)}
                        error={!!errorConfirmPassword}
                    />
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Créer le compte
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(AddAccount);

const CREATE_USER = gql`
    mutation signin($name: String!, $type: TypeEnum!, $password: String!, $passwordConfirmation: String!) {
        signin(user: {name: $name, type: $type, password: $password, passwordConfirmation: $passwordConfirmation}) {
            _id
        }
    }
`;
