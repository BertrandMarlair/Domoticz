/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./AccountPwdEditStyle";
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

const AccountPwdEdit = ({classes, account, onClose}) => {
    const [id, setId] = useState();
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

    const history = useHistory();

    const {t} = useTranslation();
    const [accountPwdEditMutation, {data, loading, error}] = useMutation(RESET_USER_PWD);

    useEffect(() => {
        if (account?._id) {
            setId(account._id);
        }
    });

    useEffect(() => {
        console.log("---data");
        console.log(data);
        if (data?.resetUserPwd?._id) {
            notify("Success", {
                variant: "success",
            });
            onClose();
        }
    }, [data, history, t]);

    const accountPwdEdit = (e) => {
        e.preventDefault();
        let validation = true;

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
            accountPwdEditMutation({variables: {_id: id, password: password, passwordConfirmation: confirmPassword}});
        }
    };

    return (
        <div className={classes.wrapperModal}>
            <div className={classes.title}>
                <Title normal centered>
                    Modification du mot de passe de {account.name}
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Voulez-vous vraiment modifier le mot de passe ?
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => accountPwdEdit(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Nouveau mot de passe
                    </SmallTitle>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("connect.signin.passwordInputLabel")}
                        autoComplete={"current-password"}
                        type={"password"}
                        helperText={t(errorPassword)}
                        error={!!errorPassword}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Confirmation du nouveau mot de passe
                    </SmallTitle>
                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t("connect.signin.confirmPasswordInputLabel")}
                        autoComplete={"current-password"}
                        type={"password"}
                        helperText={t(errorConfirmPassword)}
                        error={!!errorConfirmPassword}
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

export default withStyles(style)(AccountPwdEdit);

const RESET_USER_PWD = gql`
    mutation resetUserPwd($_id: ID!, $password: String!, $passwordConfirmation: String!) {
        resetUserPwd(_id: $_id, password: $password, passwordConfirmation: $passwordConfirmation) {
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
