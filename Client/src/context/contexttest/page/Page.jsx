import React, {useState, useEffect} from "react";
import {withStyles, Grid} from "@material-ui/core";
import style from "./PageStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";

const Page = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [tests, setTests] = useState([]);

    const {data, loading, error} = useQuery(GET_CONTEXTTEST);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllTests) {
            setTests(data.getAllTests);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {tests.map((app) => (
                    <Grid item lg={4} md={6} xs={12} key={`test/${app._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <Title>{app.title}</Title>
                            <Text noWrap className={classes.description}>
                                {app.description}
                            </Text>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(Page);

const GET_CONTEXTTEST = gql`
    query getAllTests {
        getAllTests {
            _id
            title
            description
        }
    }
`;
