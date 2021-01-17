/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {withStyles, Grid, IconButton, MenuItem, MenuList} from "@material-ui/core";
import style from "./UsersStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import {useTheme} from "@material-ui/styles";
import SmallTitle from "../../../components/typography/SmallTitle";
import Popper from "../../../components/popper/Popper";

const User = ({classes, history}) => {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [anchorElOption, setAnchorElOption] = useState(false);
    const theme = useTheme();

    const {data, loading, error} = useQuery(GET_USERS);

    const handleEditUser = (user) => {
        setOpen(true);
        setOption(user);
    };

    const handleDeleteUser = (user) => {
        setOpenDelete(true);
        setOption(user);
    };

    const handleClickOption = (event, userId) => {
        setAnchorElOption({event: event.currentTarget, userId});
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
        console.log("----- GET USERS -----");
        if (data?.getAllUsers) {
            console.log(data);
            setUsers(data.getAllUsers);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Card className={classes.addUser}>
                <div className={classes.addUserHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addUserIcon}>
                        Checked
                    </Icon>
                    <div>
                        <SmallTitle className={classes.addUserTitle}>Créer un nouvel utilisateur</SmallTitle>
                        <Text className={classes.addProviderText} color="lightGrey">
                            Le provider est le point central d'un produit domotique pour la maison.
                        </Text>
                    </div>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new user
                </Button>
            </Card>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {users.map((user) => (
                    <Grid item lg={4} md={4} xs={12} key={`user/${user._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <div className={classes.option}>
                                <IconButton onClick={(e) => handleClickOption(e, user._id)}>
                                    <Icon>More</Icon>
                                </IconButton>
                            </div>
                            <Icon center size={60}>
                                {user.icon}
                            </Icon>
                            <Title bold center>
                                {user.name}
                            </Title>
                            <Text center noWrap className={classes.type}>
                                {user.type}
                            </Text>
                            <Button onClick={() => history.push(`/user/${user._id}`)} fullWidth>
                                {user.button}
                            </Button>
                        </Card>
                        <Popper
                            placement={"bottom"}
                            anchorEl={anchorElOption?.userId === user._id && anchorElOption.event}
                            handleClose={handleCloseOption}>
                            <MenuList>
                                <MenuItem onClick={() => handleEditUser(user)}>
                                    <SmallTitle normal>Edit user</SmallTitle>
                                </MenuItem>
                                <MenuItem onClick={() => handleDeleteUser(user)}>
                                    <SmallTitle normal>Delete user</SmallTitle>
                                </MenuItem>
                            </MenuList>
                        </Popper>
                    </Grid>
                ))}
            </Grid>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(User);

const GET_USERS = gql`
    query getAllProviders {
        getAllProviders {
            _id
            name
            type
            permission
            active
            verified
        }
    }
`;
