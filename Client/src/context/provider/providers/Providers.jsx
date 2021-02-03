/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect, Fragment} from "react";
import {withStyles, Grid, IconButton, MenuItem, MenuList, Divider} from "@material-ui/core";
import style from "./ProvidersStyle";
import gql from "graphql-tag";
import {useMutation, useQuery} from "react-apollo";
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
import ProviderForm from "./components/ProviderForm";
import Popper from "../../../components/popper/Popper";
import DeleteProvider from "./components/DeleteProvider";
import notify from "../../../core/snackbar/snackbar";

const Provider = ({classes, history}) => {
    const [loaded, setLoaded] = useState(false);
    const [providers, setProviders] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [option, setOption] = useState(null);
    const [anchorElOption, setAnchorElOption] = useState(false);
    const theme = useTheme();

    const [createProvider, createProviderData] = useMutation(CREATE_PROVIDER);

    useEffect(() => {
        if (createProviderData?.data?.createProvider?._id) {
            notify("Success", {
                variant: "success",
            });
            setProviders((e) => [...e, {...createProviderData?.data.createProvider}]);
        }
    }, [createProviderData]);

    const {data, loading, error} = useQuery(GET_PROVIDER);

    const handleEditProvider = (provider) => {
        setOpen(true);
        setOption(provider);
    };

    const handleDeleteProvider = (provider) => {
        setOpenDelete(true);
        setOption(provider);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setOption(null);
    };

    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
        setOption(null);
    };

    const handleClickOption = (event, providerId) => {
        setAnchorElOption({event: event.currentTarget, providerId});
    };

    const handleCloseOption = () => {
        setAnchorElOption(null);
    };

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

    const defaultProviders = [
        {
            title: "Philips Hue",
            description: "Faites de votre maison un endroit encore plus chaleureux grâce à un éclairage adapté.",
            slug: "philips_hue",
            icon: "Hue",
            button: "Hue",
        },
        {
            title: "Netatmo",
            description: "La bonne température dans chaque pièce de votre logement",
            slug: "netatmo",
            icon: "SmartTemperature",
            button: "Thermostat",
        },
        {
            title: "Sonoff",
            description: "Créez facilement votre propre système Smart Home avec Sonoff",
            slug: "sonoff",
            icon: "Plug",
            button: "Sonoff",
        },
    ];

    const notInstalledProvider = defaultProviders.filter((def) => !providers.map((p) => p.slug).includes(def.slug));

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
                    <Grid item lg={4} md={4} xs={12} key={`provider/${provider.slug}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <div className={classes.option}>
                                <IconButton onClick={(e) => handleClickOption(e, provider._id)}>
                                    <Icon>More</Icon>
                                </IconButton>
                            </div>
                            <Icon center size={60}>
                                {provider.icon}
                            </Icon>
                            <Title bold center>
                                {provider.title}
                            </Title>
                            <Text center noWrap className={classes.description}>
                                {provider.description}
                            </Text>
                            <Button onClick={() => history.push(`/provider/${provider.slug}`)} fullWidth>
                                {provider.button}
                            </Button>
                        </Card>
                        <Popper
                            placement={"bottom"}
                            anchorEl={anchorElOption?.providerId === provider._id && anchorElOption.event}
                            handleClose={handleCloseOption}>
                            <MenuList>
                                <MenuItem onClick={() => handleEditProvider(provider)}>
                                    <SmallTitle normal>Edit provider</SmallTitle>
                                </MenuItem>
                                <MenuItem onClick={() => handleDeleteProvider(provider)}>
                                    <SmallTitle normal>Delete provider</SmallTitle>
                                </MenuItem>
                            </MenuList>
                        </Popper>
                    </Grid>
                ))}
            </Grid>
            {notInstalledProvider.length > 0 && (
                <Fragment>
                    <Divider />
                    <SmallTitle className={classes.installNewProviderText}>Install new provider</SmallTitle>
                    <Error errorMessage={error} />
                    <Grid container className={classes.container}>
                        {notInstalledProvider.map((provider) => (
                            <Grid
                                item
                                lg={4}
                                md={4}
                                xs={12}
                                key={`provider/${provider.slug}`}
                                className={classes.gridItem}>
                                <Card className={classes.card}>
                                    <Icon center size={60}>
                                        {provider.icon}
                                    </Icon>
                                    <Title bold center>
                                        {provider.title}
                                    </Title>
                                    <Text center noWrap className={classes.description}>
                                        {provider.description}
                                    </Text>
                                    <Button onClick={() => createProvider({variables: {provider}})} fullWidth>
                                        Install {provider.title}
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Fragment>
            )}
            {loading && <Loading absolute />}
            <Modal open={open} onClose={() => handleCloseModal()}>
                <ProviderForm
                    onClose={() => handleCloseModal()}
                    option={option}
                    setProviders={setProviders}
                    providers={providers}
                />
            </Modal>
            <Modal open={openDelete} onClose={() => handleCloseDeleteModal()}>
                <DeleteProvider
                    onClose={() => handleCloseDeleteModal()}
                    option={option}
                    setProviders={setProviders}
                    providers={providers}
                />
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
            button
            description
        }
    }
`;

const CREATE_PROVIDER = gql`
    mutation createProvider($provider: createProviderInput!) {
        createProvider(provider: $provider) {
            _id
            title
            slug
            button
            icon
            description
        }
    }
`;
