import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core";
import style from "./AccountStyle";
import gql from "graphql-tag";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import SmallTitle from "../../../components/typography/SmallTitle";
import {UPDATE_USER_INFO} from "../../../core/reducers/connectConfig";
import Select from "../../../components/select/Select";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/react-hooks";
import {useDispatch, useSelector} from "react-redux";

const Account = ({classes}) => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [type, setType] = useState("");
    const [errorType, setErrorType] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.connected.user);

    const updateUserInfo = (payload) => dispatch({type: UPDATE_USER_INFO, payload});

    useEffect(() => {
        setName(user.name);
        setType(user.type);
    }, [user]);

    const handleCancel = () => {
        setName(user.name);
        setType(user.type);
    };

    const {t} = useTranslation();

    const [updateUser, {data, error, loading}] = useMutation(UPDATE_USER);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (name.length < 2) {
            setErrorName("connect.register.errors.invalidName");
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

        if (validation) {
            const input = {
                name,
                type,
            };

            updateUser({variables: {...input}});
        }
    };

    useEffect(() => {
        if (data?.updateUser?._id) {
            notify(t("connect.signin.success.signin"), {
                variant: "success",
            });
            updateUserInfo(data.updateUser);
        }
    }, [data, history, t]);

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
        <div className={classes.root}>
            <Title bold>Edition du profile</Title>
            <Text>Editez votre profile et sauvegarder vos changement</Text>
            <form className={classes.form} onSubmit={(e) => createUser(e)}>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        {t("connect.signin.nameInputTitle")}
                    </SmallTitle>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("connect.signin.nameInputLabel")}
                        autoComplete={"name"}
                        type={"text"}
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
                            placeholder={t("connect.signin.typeInputLabel")}
                            options={options}
                            error={!!errorType}
                            isClearable={false}
                            onChange={(e) => setType(e.value)}
                            isSearchable={false}
                            inputValue=""
                            value={options.find((e) => e.value === type)}
                        />
                    </div>
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin type="submit" loading={loading}>
                        Sauvegarder
                    </Button>
                    <Button noMargin color="transparent" onClick={() => handleCancel()}>
                        Annuler
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(Account);

const UPDATE_USER = gql`
    mutation updateUser($name: String!, $type: TypeEnum!) {
        updateUser(name: $name, type: $type) {
            _id
        }
    }
`;
