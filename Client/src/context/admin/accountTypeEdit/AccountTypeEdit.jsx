/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import style from "./AccounTypeEditStyle";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import {useHistory} from "react-router-dom";
import Text from "../../../components/typography/Text";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

const AccountTypeEdit = ({classes, account, onClose}) => {
    const [id, setId] = useState();
    const [state, setState] = React.useState({
        confirmed: false,
    });
    const [errorConfirmType, setErrorConfirmType] = useState("");
    const [newType, setNewType] = useState("");

    const history = useHistory();

    const {t} = useTranslation();
    const [accountTypeEditMutation, {data, loading, error}] = useMutation(ACCOUNT_TYPE_EDIT);

    useEffect(() => {
        if (account?._id) {
            setId(account._id);
            if (account.type === "device") {
                setNewType("user");
            } else if (account.type === "user") {
                setNewType("device");
            }
        }
    });

    useEffect(() => {
        console.log("---data");
        console.log(data);
        if (data?.accountTypeUpdate?._id) {
            notify("Success", {
                variant: "success",
            });
            onClose();
            history.push(`/admin/${data.accountTypeUpdate.type}/${data.accountTypeUpdate._id}`);
        }
    }, [data, history, t]);

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const accountTypeEdit = (e) => {
        e.preventDefault();
        let validation = true;

        if (state.confirmed === false) {
            setErrorConfirmType("Vous devez confirmer l'action");
            validation = false;
        } else {
            setErrorConfirmType("");
        }

        console.log("-----test");
        console.log(newType);

        if (validation) {
            accountTypeEditMutation({variables: {_id: id, type: newType}});
        }
    };

    return (
        <div className={classes.wrapperModal}>
            <div className={classes.title}>
                <Title normal centered>
                    Modification du type de <strong>{account.name}</strong>
                </Title>
            </div>
            <div className={classes.description}>
                <Text noWrap centered>
                    Ce compte est actuellement de type "{account.type}".
                </Text>
                <Text noWrap centered>
                    Voulez-vous vraiment le modifier en "{newType}"?
                </Text>
            </div>
            <form className={classes.form} onSubmit={(e) => accountTypeEdit(e)}>
                <div className={classes.input}>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            control={<Checkbox checked={state.confirmed} onChange={handleChange} name="confirmed" />}
                            label="Je confirme le changement de type"
                            labelPlacement="end"
                        />
                    </FormGroup>
                </div>
                <Error errorMessage={error ? error : errorConfirmType} />
                <div className={classes.formFooter}>
                    <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                        Modifier le type
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(AccountTypeEdit);

const ACCOUNT_TYPE_EDIT = gql`
    mutation accountTypeUpdate($_id: ID!, $type: TypeEnum!) {
        accountTypeUpdate(_id: $_id, type: $type) {
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
