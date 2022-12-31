import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { checkInAction, serviceAction } from '../../actions';
import { dtStr2dStr } from '../../services/utils/time';
import styles from '../../assets/styles/detailCheckIn.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { dt2dtStr } from '../../services/utils/time';
import { Container } from '@mui/system';

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
        width: 800,
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
                            <span>{t('checkIn.full_name')}</span>
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

                    {/* check in date */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('checkIn.check_in_date')}</span>
                        </div>

                        <div className={styles.input}>
                            <span><b>{dt2dtStr(new Date(selectedCustomer?.createdDate))}</b></span>
                        </div>
                    </li>


                    <h4 className={styles.section_title}>{t('checkIn.check_in_list')}</h4>

                    {/* checkIn detail */}
                    {selectedCustomer.orders && selectedCustomer.orders.length > 0
                        ? <>
                            {
                                selectedCustomer.orders?.map((order, index) => {
                                    return (
                                        <div key={index} style={{ marginLeft: 10 }}>
                                            <li>
                                                <div className={styles.input_title}>
                                                    <span>{t('checkIn.id')}</span>
                                                </div>

                                                <div className={styles.input}>
                                                    <span><b>{order.id}</b></span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className={styles.input_title}>
                                                    <span>{t('checkIn.created_date')}</span>
                                                </div>

                                                <div className={styles.input}>
                                                    <span><b>{dt2dtStr(new Date(order.createdDate))}</b></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={styles.input_title}>
                                                    <span>{t('checkIn.status')}</span>
                                                </div>

                                                <div className={styles.input}>
                                                    <span><b>{order.status}</b></span>
                                                </div>
                                            </li>

                                            {order.orderDetails && order.orderDetails.length > 0 ?
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('order.id')}</TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('order.service_name')}</TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('order.price')}</TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('order.quantity')}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {order.orderDetails.map((row) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell align="center">{row.id}</TableCell>
                                                                <TableCell align="center">{row.serviceName}</TableCell>
                                                                <TableCell align="center">{row.servicePrice}</TableCell>
                                                                <TableCell align="center">{row.quantity}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                : null}

                                        </div>
                                    )
                                })
                            }
                        </>

                        : <span>No check in!</span>
                    }
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