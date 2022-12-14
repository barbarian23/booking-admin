import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';
import styles from '../../assets/styles/addService.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddServiceModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowAddServiceModal, branches } = useSelector(state => state.service);
    const [options, setOptions] = useState([]);
    const [branchID, setBranchID] = useState(0);
    const [serviceName, setServiceName] = useState('');


    useEffect(() => {
        if (isShowAddServiceModal) {
            dispatch({
                type: serviceAction.GET_COMBO_BRANCHES,
            });
        }
    }, [isShowAddServiceModal]);

    useEffect(() => {
        setOptions(branches.map((branch) => {
            return {
                ...branch,
                label: branch.title,
                id: branch.value,
            }
        }));
    }, [branches]);

    const onBranchIDSelected = (e) => {
        let index = e.target.dataset.optionIndex
        if(index >=0){
            setBranchID(Number(branches[index].value));
        }else{
            setBranchID(-1);
        }
    }

    const onServiceNameChanged = (e) => {
        setServiceName(e.target.value)
    }
    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: serviceAction.ADD_SERVICE,
            value: {
                branchID: branchID,
                serviceName: serviceName,
            }
        });
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_MODAL,
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
        open={isShowAddServiceModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('service.add_service')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.branch')}</span>
                        </div>

                        <div className={styles.input}>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="branch-id"
                                options={options}
                                getOptionLabel={option => option.title}
                                onChange={onBranchIDSelected}
                                sx={{ p: 0 }}
                                renderInput={(params) => <TextField 
                                    {...params} />}
                            />
                        </div>

                    </li>
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.service_name')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="service-name"
                                value={serviceName}
                                sx={{ p: 0 }}
                                onChange={onServiceNameChanged}
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
                        fontWeight: '700',
                        mr: 1,
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
export default memo(AddServiceModal);