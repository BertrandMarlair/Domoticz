/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {withStyles, Grid, IconButton} from "@material-ui/core";
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
import Icon from "../../../components/icon/Icon";
import {useTheme} from "@material-ui/styles";
import SmallTitle from "../../../components/typography/SmallTitle";
import AddProviderForm from "./components/AddProviderForm";

const Provider = ({classes, history}) => {
    const [loaded, setLoaded] = useState(false);
    const [providers, setProviders] = useState([]);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const {data, loading, error} = useQuery(GET_PROVIDER);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllProviders) {
            setProviders(data.getAllProviders);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Card className={classes.addProvider}>
                <div className={classes.addProviderHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addProviderIcon}>
                        Checked
                    </Icon>
                    <div>
                        <SmallTitle className={classes.addProviderTitle}>Créer un nouveau provider</SmallTitle>
                        <Text className={classes.addProviderText} color="lightGrey">
                            Le provider est le point central d'un produit domotique pour la maison.
                        </Text>
                    </div>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new provider
                </Button>
            </Card>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {providers.map((provider) => (
                    <Grid item lg={4} md={6} xs={12} key={`provider/${provider._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <div>
                                <Icon>{provider.icon}</Icon>
                                <Title>{provider.title}</Title>
                            </div>
                            <Text noWrap className={classes.description}>
                                {provider.description}
                            </Text>
                            <div>
                                <IconButton onClick={() => history.push(`/add/provider/${provider.slug}`)}>
                                    <Icon color={theme.palette.primary.main} size={50}>
                                        Add
                                    </Icon>
                                </IconButton>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && <Loading absolute />}
            <Modal open={open} onClose={() => setOpen(false)}>
                <AddProviderForm onClose={() => setOpen(false)} setProviders={setProviders} />
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
            icon
            slug
            description
        }
    }
`;
