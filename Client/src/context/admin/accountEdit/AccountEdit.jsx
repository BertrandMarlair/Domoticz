/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./AccountEditStyle";
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
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";

const AccountEdit = ({classes, account, onClose, setAccount}) => {
    const [accountTypeString, setAccountTypeString] = useState("");
    const [id, setId] = useState();
    const [name, setName] = useState(account.name);
    const [errorName, setErrorName] = useState(null);
    const history = useHistory();
    const [state, setState] = useState({
        active: account.active,
        verified: account.basic.verified,
    });

    const {t} = useTranslation();
    const [updateAccountMutation, {data, loading, error}] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (account.type === "user") {
            setAccountTypeString(`de l'utilisateur`);
        } else if (account.type === "device") {
            setAccountTypeString(`du device`);
        }
        if (account?._id) {
            setId(account._id);
        }
    });

    useEffect(() => {
        if (data?.editUser?._id) {
            notify("Success", {
                variant: "success",
            });
            setAccount(data.editUser);
            onClose();
        }
    }, [data, history, t]);

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const updateAccount = (e) => {
        e.preventDefault();
        let validation = true;

        if (name.length < 2) {
            setErrorName("Le nom doit faire plus de deux caractères");
            validation = false;
        } else {
            setErrorName("");
        }

        if (validation) {
            updateAccountMutation({variables: {_id: id, name: name, active: state.active, verified: state.verified}});
        }
    };

    return (
        <div className={classes.wrapperModal}>
            <div className={classes.title}>
                <Title normal centered>
                    Modification {accountTypeString} {account.name}
                </Title>
            </div>
            <div className={classes.description}>
                <Text className={classes.text} noWrap centered>
                    Attention ! Cette action est irréversible. Voulez-vous vraiment supprimer cet utilisateur ?
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => updateAccount(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Nom
                    </SmallTitle>
                    <Input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={name}
                        type={"text"}
                        helperText={t(errorName)}
                        error={!!errorName}
                    />
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Status
                    </SmallTitle>
                    <FormGroup className={classes.wrapperStatus} row>
                        <FormControlLabel
                            control={<Switch checked={state.active} onChange={handleChange} name="active" />}
                            label="Active"
                        />
                        <FormControlLabel
                            control={<Switch checked={state.verified} onChange={handleChange} name="verified" />}
                            label="Verifié"
                        />
                    </FormGroup>
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Modifier
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(AccountEdit);

const UPDATE_USER = gql`
    mutation editUser($_id: ID!, $name: String!, $active: Boolean!, $verified: Boolean!) {
        editUser(_id: $_id, name: $name, active: $active, verified: $verified) {
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
