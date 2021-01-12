import React, {useState, useEffect} from "react";
import {withStyles, Grid} from "@material-ui/core";
import style from "./ProviderStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Modal from "../../../components/modal/SimpleModal";
import Button from "../../../components/button/Button";

const Provider = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [provider, setProvider] = useState([]);
    const [open, setOpen] = useState(false);

    const {data, loading, error} = useQuery(GET_PROVIDER);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllProviders) {
            setProvider(data.getAllProviders);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <div>
                <Button onClick={() => setOpen(true)}>Add new provider</Button>
            </div>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {provider.map((app) => (
                    <Grid item lg={4} md={6} xs={12} key={`application/${app._id}`} className={classes.gridItem}>
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
            <Modal open={open} onClose={() => setOpen(false)}>
                <div>coucou</div>
            </Modal>
        </div>
    );
};

export default withStyles(style)(Provider);

const GET_PROVIDER = gql`
    query getAllProviders {
        getAllProviders {
            _id
            title
            description
        }
    }
`;
