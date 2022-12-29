import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { checkInAction } from '../../actions';
import { dtStr2dStr } from '../../services/utils/time';
import styles from '../../assets/styles/detailCheckIn.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { dt2dtStr } from '../../services/utils/time';

const DetailCheckInModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowDetailCheckInModal, selectedCustomer } = useSelector(state => state.checkIn);

    const handleClose = () => {
        dispatch({
            type: checkInAction.HIDE_DETAIL_CHECK_IN_MODAL,
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
        open={isShowDetailCheckInModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} className={styles.book_detail}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('checkIn.detail_check_in')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    <h4 className={styles.section_title}>{t('checkIn.customer_information')}</h4>
                    {/* full name */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.fullName')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.fullName}</b></span>
                        </div>
                    </li>

                    {/* phone number*/}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.phone_number')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.numberPhone}</b></span>
                        </div>

                    </li>

                    {/* email */}
                    <li>

                        <div className={styles.input_title}>
                            <span>{t('checkIn.email')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.email}</b></span>
                        </div>
                    </li>
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.status')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.statusWaiting}</b></span>
                        </div>
                    </li>

                    <h4 className={styles.section_title}>{t('checkIn.check_in')}</h4>
                    {/* check in date */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.check_in_date')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{dt2dtStr(new Date(selectedCustomer?.createdDate))}</b></span>
                        </div>
                    </li>

                    {/* timeline */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.timeline')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.timeLine?.title}</b></span>
                        </div>
                    </li>

                    {/* description */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.description')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedCustomer?.description}</b></span>
                        </div>
                    </li>

                    {/* checkIn detail */}
                    {
                        selectedCustomer?.checkInDetails ?
                            <>
                                <h4 className={styles.section_title}>{t('checkIn.detail')}</h4>
                                {
                                    selectedCustomer?.checkInDetails?.map((item, index) => {
                                        return (
                                            <>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('checkIn.detailName')}</span>
                                                    </div>

                                                    <div className={styles.input}>
                                                        <span><b>{item.serviceDetail.name}</b></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('checkIn.detailQuantity')}</span>
                                                    </div>

                                                    <div className={styles.input}>
                                                        <span><b>{item.quantity}</b></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('checkIn.detailPrice')}</span>
                                                    </div>

                                                    <div className={styles.input}>
                                                        <span><b>{item.serviceDetail.price}</b></span>
                                                    </div>
                                                </li>
                                                <br></br>
                                            </>
                                        )
                                    })
                                }
                            </>
                            :
                            null
                    }
                    {selectedCustomer?.branch ? <>
                        <h4 className={styles.section_title}>{t('checkIn.branch')}</h4>
                        {/* branch name */}
                        <li>
                            <div className={styles.input_title}>
                                <span>{t('checkIn.name')}</span>
                            </div>

                            <div className={styles.input}>
                                <span><b>{selectedCustomer?.branch.name} %</b></span>
                            </div>

                        </li>

                        {/* addrress */}
                        <li>
                            <div className={styles.input_title}>
                                <span>{t('checkIn.address')}</span>
                            </div>

                            <div className={styles.input}>
                                <span><b>{selectedCustomer?.branch?.address}</b></span>
                            </div>

                        </li>
                    </>
                        : null}
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
export default memo(DetailCheckInModal);