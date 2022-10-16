import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { branchAction } from '../../actions';
import styles from '../../assets/styles/addBranch.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddBranchModal = ({ branch }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowAddBranchModal } = useSelector(state => state.branch);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [hotLine, setHotLine] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName('');
        setAddress('');
        setHotLine('');
        setDescription('');
    }, [isShowAddBranchModal]);

    const onNameChanged = (e) => {
        setName(e.target.value)
    }

    const onAddressChanged = (e) => {
        setAddress(e.target.value)
    }

    const onHotLineChanged = (e) => {
        setHotLine(e.target.value)
    }


    const onDescriptionChanged = (e) => {
        setDescription(e.target.value)
    }

    const handleClose = () => {
        dispatch({
            type: branchAction.HIDE_ADD_BRANCH_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: branchAction.ADD_BRANCH,
            value: {
                name: name,
                address: address,
                hotLine: hotLine,
                description: description
            }
        });
        dispatch({
            type: branchAction.HIDE_ADD_BRANCH_MODAL,
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <Modal
        open={isShowAddBranchModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('branch.add_branch')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('branch.name')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="name"
                                value={name}
                                sx={{ p: 0 }}
                                onChange={onNameChanged}
                            />
                        </div>

                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('branch.address')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="address"
                                value={address}
                                sx={{ p: 0 }}
                                onChange={onAddressChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('branch.hot_line')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="hot-line"
                                value={hotLine}
                                sx={{ p: 0 }}
                                onChange={onHotLineChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('branch.description')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="description"
                                value={description}
                                sx={{ p: 0 }}
                                onChange={onDescriptionChanged}
                            />
                        </div>
                    </li>
                </ul>
            </Grid>

            <Grid container>
                <Button
                    variant="contained"
                    color="success"
                    className={styles.btn}
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                    onClick={handleSave}
                >
                    {t('button.add')}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    className={styles.btn}
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                    onClick={handleClose}
                >
                    {t('button.cancel')}
                </Button>
            </Grid>
        </Box>
    </Modal>

}
export default memo(AddBranchModal);