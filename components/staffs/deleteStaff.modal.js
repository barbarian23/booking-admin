import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { staffAction } from '../../actions';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const DeleteStaffModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowDeleteStaffModal, selectedStaff } = useSelector(state => state.staff);

    const handleClose = () => {
        dispatch({
            type: staffAction.HIDE_DELETE_STAFF_MODAL,
        });
    }

    const onBtnNoClicked = () => {
        dispatch({
            type: staffAction.HIDE_DELETE_STAFF_MODAL,
        });
    }

    const onBtnYesClicked = () => {
        dispatch({
            type: staffAction.DELETE_STAFF,
            value: {
                staffId: selectedStaff.id,
            }
        });
        dispatch({
            type: staffAction.HIDE_DELETE_STAFF_MODAL,
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
        textAlign: 'center',
    };

    return <Modal
        open={isShowDeleteStaffModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('staff.do_you_want_to_delete_staff')} ?
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
export default memo(DeleteStaffModal);