import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';

import { bookingAction, notificationAction } from '../../actions';
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/booking.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BookingDetailModal from '../../components/booking/bookingDetail.modal';
import { dt2dtStr } from '../../services/utils/time';

import { WS_URL, BRANCH_CODE } from '../../services/api/api.config';

const BOOKING_SUBRIDRE_URL = `/topic/booking/success/${BRANCH_CODE}`;

const Booking = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { bookings, isLoading, page, totalPage } = useSelector(state => state.booking);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log('[WS] Opened!');
            const msg = {
                type: 'subscribe',
                channel: BOOKING_SUBRIDRE_URL
            };
            ws.send(JSON.stringify(msg));
        };

        ws.onclose = () => console.log('[WS] Closed!');

        ws.onmessage = e => {
            dispatch({
                type: notificationAction.SUCCESS,
                value: "Recived new booking!"
            });
            dispatch({
                type: bookingAction.GET_PAGGING_BOOKINGS,
            });
        };

        return () => {
            ws.close();
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: bookingAction.GET_PAGGING_BOOKINGS,
        });
    }, []);

    const showBookingDetails = (booking) => {
        dispatch({
            type: bookingAction.SELECT_BOOKING,
            value: booking
        });

        dispatch({
            type: bookingAction.SHOW_DETAIL_BOOKING_MODAL,
            value: booking
        });
    }

    const onPageChanged = (event, page) => {
        dispatch({
            type: bookingAction.PAGE_CHANGE,
            value: page
        });
    }

    return <Grid container>
        <Box>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {t('menu.home')}
                </Link>

                <Typography color="text.primary">
                    {t('menu.booking')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.booking')}</h3>
            </Grid>
            <Grid item
                xs={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            </Grid>
        </Grid>

        <Grid container>
            {isLoading
                ? <div style={{ width: '100%', textAlign: '-webkit-center' }}>
                    <ReactLoading
                        type="spin"
                        color="#1976d2"
                        height={100}
                        width={100} />
                </div>
                : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.id')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.customer')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.phone')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.booking_date')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.timeline')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.branch')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('booking.action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.customerName}</TableCell>
                                    <TableCell align="center">{row.numberPhone}</TableCell>
                                    <TableCell align="center">{dt2dtStr(new Date(row.bookingDate))}</TableCell>
                                    <TableCell align="center">{row.timeLine?.localTime}</TableCell>
                                    <TableCell align="center">{row.branch?.name}</TableCell>
                                    <TableCell align="center" className={styles.buttons}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: '700'
                                            }}
                                            onClick={() => { showBookingDetails(row) }}
                                        >
                                            {t('button.detail')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box>
                        <Grid container>
                            <Grid item lg={6}>
                            </Grid>
                            <Grid item lg={6}
                                sx={{ display: 'flex', justifyContent: 'flex-end', height: "3em", mt: 2 }}>
                                <Stack spacing={page}>
                                    <Pagination
                                        page={page}
                                        count={totalPage}
                                        shape="rounded"
                                        onChange={onPageChanged} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </TableContainer>
            }
        </Grid>

        <BookingDetailModal />

    </Grid>


}
export default Booking;