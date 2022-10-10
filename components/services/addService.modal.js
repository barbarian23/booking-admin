import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddServiceModal = ({ service }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowAddServiceModal, branches } = useSelector(state => state.service);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (isShowAddServiceModal) {
            dispatch({
                type: serviceAction.GET_COMBO_BRANCHES,
            });
        }
    }, [isShowAddServiceModal]);

    useEffect(() => {
        setOptions(branches.map((branch)=> {
            return {
                ...branch,
                label: branch.title,
                id: branch.value,
            }
        }));
    }, [branches]);

    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_MODAL,
        });
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {t('service.add_service')}
            </Typography>

            <Grid>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>

            <Grid>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                >
                    {t('button.add')}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                    onClick={handleSave}
                >
                    {t('button.cancel')}
                </Button>
            </Grid>
        </Box>
    </Modal>

}
export default memo(AddServiceModal);