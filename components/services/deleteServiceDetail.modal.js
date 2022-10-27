import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const DeleteServiceDetailModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowDeleteServiceDetailModal, selectedServiceDetail } = useSelector(state => state.service);

    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_DELETE_SERVICE_DETAIL_MODAL,
        });
    }

    const onBtnNoClicked = () => {
        dispatch({
            type: serviceAction.HIDE_DELETE_SERVICE_DETAIL_MODAL,
        });
    }

    const onBtnYesClicked = () => {
        dispatch({
            type: serviceAction.DELETE_SERVICE_DETAIL,
            value: {
                serviceDetailId: selectedServiceDetail.id,
            }
        });
        dispatch({
            type: serviceAction.HIDE_DELETE_SERVICE_DETAIL_MODAL,
        });
        dispatch({
            type: serviceAction.HIDE_SERVICE_DETAILS_MODAL,
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    return <Modal
        open={isShowDeleteServiceDetailModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('service.do_you_want_to_delete_service_detail')} ?
            </Typography>

            <Grid sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        fontSize: 14,
                        fontWeight: '700',
                        mr: 5,
                    }}
                    onClick={onBtnNoClicked}
                >
                    {t('button.no')}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                    onClick={onBtnYesClicked}
                >
                    {t('button.yes')}
                </Button>
            </Grid>
        </Box>
    </Modal>

}
export default memo(DeleteServiceDetailModal);