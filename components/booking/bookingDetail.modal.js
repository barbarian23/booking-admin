import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { bookingAction } from '../../actions';
import { dtStr2dStr } from '../../services/utils/time';
import styles from '../../assets/styles/detailBooking.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { dt2dtStr } from '../../services/utils/time';

const DetailBookingModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowDetailBookingModal, selectedBooking } = useSelector(state => state.booking);

    const handleClose = () => {
        dispatch({
            type: bookingAction.HIDE_DETAIL_BOOKING_MODAL,
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
        open={isShowDetailBookingModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('booking.detail_booking')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    <h4 className={styles.section_title}>{t('booking.customer_information')}</h4>
                    {/* name */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('booking.name')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedBooking?.customerName}</b></span>
                        </div>
                    </li>

                    {/* phone */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('booking.phone')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedBooking?.numberPhone}</b></span>
                        </div>

                    </li>

                    {/* email */}
                    <li>

                        <div className={styles.input_title}>
                            <span>{t('booking.email')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedBooking.customerEmail}</b></span>
                        </div>
                    </li>

                    <h4 className={styles.section_title}>{t('booking.booking')}</h4>
                    {/* booking date */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('booking.booking_date')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{dt2dtStr(new Date(selectedBooking?.bookingDate))}</b></span>
                        </div>
                    </li>

                    {/* timeline */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('booking.timeline')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedBooking?.timeLine?.title}</b></span>
                        </div>
                    </li>

                    {/* description */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('booking.description')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{selectedBooking?.description}</b></span>
                        </div>
                    </li>

                    {/* booking detail */}
                    {
                        selectedBooking?.bookingDetails ?
                            <div style={{overflowY: "scroll", height:"80%"}}>
                                <h4 className={styles.section_title}>{t('booking.detail')}</h4>
                                {
                                    selectedBooking?.bookingDetails?.map((item, index) => {
                                        return (
                                            <>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('booking.detailName')}</span>
                                                    </div>

                                                    <div className={styles.input}>
                                                        <span><b>{item.serviceDetail.name}</b></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('booking.detailQuantity')}</span>
                                                    </div>

                                                    <div className={styles.input}>
                                                        <span><b>{item.quantity}</b></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={styles.input_title}>
                                                        <span>{t('booking.detailPrice')}</span>
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
                            </div>
                            :
                            null
                    }
                    {selectedBooking?.branch ? <>
                        <h4 className={styles.section_title}>{t('booking.branch')}</h4>
                        {/* branch name */}
                        <li>
                            <div className={styles.input_title}>
                                <span>{t('booking.name')}</span>
                            </div>

                            <div className={styles.input}>
                                <span><b>{selectedBooking?.branch.name} %</b></span>
                            </div>

                        </li>

                        {/* addrress */}
                        <li>
                            <div className={styles.input_title}>
                                <span>{t('booking.address')}</span>
                            </div>

                            <div className={styles.input}>
                                <span><b>{selectedBooking?.branch?.address}</b></span>
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
export default memo(DetailBookingModal);