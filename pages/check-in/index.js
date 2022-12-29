import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';
import { checkInAction } from '../../actions';
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/checkIn.module.scss';
// import DetailCheckInCustomerModal from '../../components/customers/detailCheckInCustomer.modal';

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
// import AddIcon from '@mui/icons-material/Add';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CheckInCustomers = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { customers, isLoading, page, totalPage } = useSelector(state => state.checkIn);

    useEffect(() => {
        dispatch({
            type: checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS,
        });
    }, []);

    const showCheckInCustomerDetails = (customer) => {
        dispatch({
            type: checkInAction.SELECT_CHECK_IN_CUSTOMER,
            value: customer
        });

        dispatch({
            type: checkInAction.SHOW_DETAIL_CHECK_IN_CUSTOMER_MODAL,
            value: customer
        });
    }

    const onPageChanged = (event, page) => {
        dispatch({
            type: checkInAction.PAGE_CHANGE,
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
                    {t('menu.check_in')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.check_in')}</h3>
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
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.id')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.full_name')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.phone_number')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.email')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.status')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.created_date')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.modifided_date')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('checkIn.action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.fullName}</TableCell>
                                    <TableCell align="center">{row.numberPhone}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.statusWaiting}</TableCell>
                                    <TableCell align="center">{row.createdDate}</TableCell>
                                    <TableCell align="center">{row.modifiedDate}</TableCell>
                                    <TableCell align="center" className={styles.buttons}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: '700'
                                            }}
                                            onClick={() => { showCheckInCustomerDetails(row) }}
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

        {/* <DetailCheckInCustomerModal /> */}
    </Grid>


}
export default CheckInCustomers;