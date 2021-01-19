/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core";
import style from "./UsersStyle";
import gql from "graphql-tag";
import {useMutation} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Button from "../../../components/button/Button";
import Error from "../../../components/error/Error";

const EditUser = ({classes}) => {
    const [loaded, setLoaded] = useState(false);

    const [createUserMutation, {data, error, loading}] = useMutation(ADD_USER);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.createUser?._id) {
            notify(t("contexttest.createBlock.success.createBlock"), {
                variant: "success",
            });
        }

        if (error) {
            setErrors("contexttest.createBlock.errors.failCreateBlock");
        }
    }, [data, history, t]);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        setErrors(null);

        if (validation) {
            const input = {
                title,
                description,
            };

            createUserMutation({variables: {user: {...input}}});
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.addUser}>
                <div className={classes.title}>
                    <Title normal centered>
                        Add a new user
                    </Title>
                </div>
                <form className={classes.form} onSubmit={(e) => createUser(e)}>
                    <div className={classes.submit}>
                        {<Error errorMessage={error || t(errors)} />}
                        <div className={classes.formFooter}>
                            <Button noMargin size="lg" loading={loading} type="submit">
                                Add
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(EditUser);

const ADD_USER = gql`
    query createUser {
        create {
            _id
            name
        }
    }
`;
