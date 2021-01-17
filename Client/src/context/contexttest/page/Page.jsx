import React, {useState, useEffect, Fragment} from "react";
import {withStyles, Grid, ButtonGroup} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import style from "./PageStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import {useMutation} from "@apollo/react-hooks";
import notify from "../../../core/snackbar/snackbar";

import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/SimpleModal";
import Input from "../../../components/input/Input";
import SmallTitle from "../../../components/typography/SmallTitle";

const Page = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [blocks, setBlocks] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errors, setErrors] = useState(null);

    const [openDelete, setOpenDelete] = useState(false);

    const {data, loading, error} = useQuery(GET_ALLBLOCKS);
    const [editBlockMutation, {data: editData, error: editError, loading: editLoading}] = useMutation(EDIT_BLOCK);
    const [deleteBlockMutation, deleteData] = useMutation(DELETE_BLOCK);

    const {t} = useTranslation();

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllBlocks) {
            setBlocks(data.getAllBlocks);
        }
    }, [data]);

    useEffect(() => {
        if (editData?.editBlock?._id) {
            handleCloseEdit();
            notify(t("contexttest.editBlock.success.editBlock"), {
                variant: "success",
            });
        }

        if (editError) {
            setErrors("contexttest.editBlock.errors.failEditBlock");
        }
    }, [editData, history, t]);

    useEffect(() => {
        if (deleteData?.data?.deleteBlock?._id) {
            notify("Success", {
                variant: "success",
            });
            const block = deleteData.data.deleteBlock;
            const blockIndex = blocks.findIndex((prov) => prov._id === block._id);

            setBlocks([...blocks.slice(0, blockIndex), ...blocks.slice(blockIndex + 1)]);
            handleCloseDelete();
        }
    }, [deleteData, history, t]);

    const handleOpenEdit = (e) => {
        setId(e._id);
        setTitle(e.title);
        setDescription(e.description);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setId("");
        setTitle("");
        setDescription("");
        setOpenEdit(false);
    };

    const handleOpenDelete = (e) => {
        setId(e._id);
        setTitle(e.title);
        setDescription(e.description);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setId("");
        setTitle("");
        setDescription("");
        setOpenDelete(false);
    };

    const editBlock = (e) => {
        e.preventDefault();
        let validation = true;

        if (title.length < 2) {
            setErrorTitle("contexttest.editBlock.errors.invalidTitle");
            validation = false;
        } else {
            setErrorTitle("");
        }

        setErrors(null);

        if (validation) {
            const input = {
                id,
                title,
                description,
            };

            editBlockMutation({variables: {block: {...input}}});
        }
    };

    const deleteBlock = (e) => {
        e.preventDefault();

        if (id !== "") {
            console.log("----- page delete block ");
            console.log(id);

            deleteBlockMutation({variables: {_id: id}});
        }
    };

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {blocks.map((block) => (
                    <Grid item lg={4} md={6} xs={12} key={`block/${block._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <Title>{block.title}</Title>
                            <Text noWrap className={classes.description}>
                                {block.description}
                            </Text>
                            <ButtonGroup>
                                <Button noMargin size="sm" loading={loading}>
                                    {t("contexttest.block.see")}
                                </Button>
                                <Button noMargin size="sm" loading={loading} onClick={() => handleOpenEdit(block)}>
                                    {t("contexttest.block.edit")}
                                </Button>
                                <Button noMargin size="sm" loading={loading} onClick={() => handleOpenDelete(block)}>
                                    {t("contexttest.block.delete")}
                                </Button>
                            </ButtonGroup>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && <Loading absolute />}
            <Modal className={classes.modal} open={openEdit} onClose={handleCloseEdit}>
                <Fragment>
                    <div className={classes.wrapper}>
                        <div className={classes.title}>
                            <Title normal centered>
                                {t("contexttest.editBlock.title")}
                            </Title>
                        </div>
                        <form className={classes.form} onSubmit={(e) => editBlock(e)}>
                            <div className={classes.inputTitle}>
                                <SmallTitle color="label" className={classes.label}>
                                    {t("contexttest.editBlock.titleInputTitle")}
                                </SmallTitle>
                                <Input
                                    autofocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={title}
                                    type={"text"}
                                    helperText={t(errorTitle)}
                                    error={!!errorTitle}
                                />
                            </div>
                            <div className={classes.inputDescription}>
                                <SmallTitle bold className={classes.label}>
                                    {t("contexttest.editBlock.descriptionInputTitle")}
                                </SmallTitle>
                                <Input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={description}
                                    autoComplete={"description"}
                                    type={"text"}
                                />
                            </div>
                            {<Error errorMessage={error || t(errors)} />}
                            <div className={classes.formFooter}>
                                <Button noMargin fullWidth size="lg" loading={editLoading} type="submit">
                                    {t("contexttest.editBlock.submit")}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            </Modal>
            <Modal className={classes.modal} open={openDelete} onClose={handleCloseDelete}>
                <Fragment>
                    <div className={classes.wrapper}>
                        <div className={classes.title}>
                            <Title normal centered>
                                {t("contexttest.deleteBlock.title")}
                            </Title>
                        </div>
                        <div className={classes.description}>
                            <Text noWrap centered>
                                Voulez-vous vraiment supprimer ce block ?
                            </Text>
                        </div>
                        <form className={classes.form} onSubmit={(e) => deleteBlock(e)}>
                            <div className={classes.formFooter}>
                                <Button
                                    noMargin
                                    fullWidth
                                    size="lg"
                                    type="submit"
                                    color="error"
                                    loading={deleteData?.loading}>
                                    Supprimer le provider
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            </Modal>
        </div>
    );
};

export default withStyles(style)(Page);

const GET_ALLBLOCKS = gql`
    query getAllBlocks {
        getAllBlocks {
            _id
            title
            description
        }
    }
`;

const EDIT_BLOCK = gql`
    mutation editBlock($block: editBlockInput!) {
        editBlock(block: $block) {
            _id
            title
            description
        }
    }
`;

const DELETE_BLOCK = gql`
    mutation deleteBlock($_id: ID!) {
        deleteBlock(_id: $_id) {
            _id
            title
        }
    }
`;
