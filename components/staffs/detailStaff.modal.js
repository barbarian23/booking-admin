import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { staffAction } from '../../actions';
import {dtStr2dStr} from '../../services/utils/time';
import styles from '../../assets/styles/addStaff.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const DetailStaffModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowDetailStaffModal, selectedStaff, branches, levels } = useSelector(state => state.staff);

    useEffect(() => {
        if (isShowDetailStaffModal) {
            dispatch({
                type: staffAction.GET_COMBO_BRANCHES,
            });

            dispatch({
                type: staffAction.GET_COMBO_LEVELS,
            });
        }
    }, [isShowDetailStaffModal]);

    const handleClose = () => {
        dispatch({
            type: staffAction.HIDE_DETAIL_STAFF_MODAL,
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
        open={isShowDetailStaffModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {selectedStaff?.fullName}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    {/* fullName */}
                    {/* <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.full_name')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.fullName}</b></span>
                        </div>
                    </li> */}

                    {/* passCode */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.pass_code')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.passCodeDecode}</b></span>
                        </div>
                    </li>

                    {/* branch */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.branch')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.branchStore?.name}</b></span>
                        </div>

                    </li>

                    {/* dob */}
                    <li>

                        <div className={styles.input_title}>
                            <span>{t('staff.dob')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff.dob ? dtStr2dStr(selectedStaff?.dob) : null}</b></span>
                        </div>
                    </li>

                    {/* idCard */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.id_card')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.idCard}</b></span>
                        </div>
                    </li>

                    {/* phone */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.phone')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.phone}</b></span>
                        </div>
                    </li>
                    {/* address */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.address')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.address}</b></span>
                        </div>
                    </li>

                    {/* rate */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.rate')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.rate} %</b></span>
                        </div>

                    </li>

                    {/* level */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.level')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedStaff?.level}</b></span>
                        </div>

                    </li>

                    {/* is manager */}
                    {/* <li>
                        <div>
                            <Checkbox value={selectedStaff}/>
                            <span>{t('staff.is_manager')}</span>
                        </div>
                    </li> */}
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
                    onClick={handleClose}
                >
                    {t('button.ok')}
                </Button>
            </Grid>
        </Box>
    </Modal>

}
export default memo(DetailStaffModal);