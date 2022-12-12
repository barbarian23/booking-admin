import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { reportAction } from '../../actions';
import { useTranslation } from 'react-i18next'
// import styles from '../../assets/styles/report.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {dtStr2dStr} from '../../services/utils/time';

const Report = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { reports, page, totalPage, employeeName, fromDate, toDate } = useSelector(state => state.report);

    // useEffect(() => {
    //     dispatch({
    //         type: reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT,
    //     });
    // }, []);

    const onFromDateChange = (event) => {
        console.log(event.target.value)
        dispatch({
            type: reportAction.FROM_DATE_CHANGE,
            value: event.target.value
        });
    }

    const onToDateChange = (event) => {
        dispatch({
            type: reportAction.TO_DATE_CHANGE,
            value: event.target.value
        });
    }

    const onEmployeeNameChange = (event) => {
        dispatch({
            type: reportAction.EMPLOYEE_NAME_CHANGE,
            value: event.target.value
        });
    }

    const onSearchBtnClicked = () => {
        dispatch({
            type: reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT,
        });

    }

    const onPageChanged = (event, page) => {
        dispatch({
            type: reportAction.PAGE_CHANGE,
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
                    {t('menu.report')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={4}>
                <h3>{t('menu.report')}</h3>
            </Grid>

            <Grid item xs={3}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    fullWidth
                    size="small"
                    id="query"
                    label={t('report.employee_name')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={employeeName}
                    sx={{ m: 2 }}
                    onChange={onEmployeeNameChange}
                />
            </Grid>

            <Grid item xs={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    fullWidth
                    size="small"
                    type="date"
                    id="from-date"
                    label={t('report.from_date')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={fromDate}
                    sx={{ m: 2 }}
                    onChange={onFromDateChange}
                />
            </Grid>

            <Grid item xs={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    fullWidth
                    size="small"
                    type="date"
                    id="to-date"
                    label={t('report.to_date')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={toDate}
                    sx={{ m: 2 }}
                    onChange={onToDateChange}
                />
            </Grid>

            <Grid item xs={1}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{ ml: 1, mt: 2, mb: 2 }}
                    onClick={onSearchBtnClicked}
                >
                    {t('button.search')}
                </Button>
            </Grid>
        </Grid>

        <Grid container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.id')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.employee_name')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.employee_code')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.check_in_time')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.total')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('report.employee_rate')}</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((row) => {
                            if (row.checkIn)
                                return <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.checkIn?.employeeFullName}</TableCell>
                                    <TableCell align="center">{row.checkIn?.employeeCode}</TableCell>
                                    <TableCell align="center">{dtStr2dStr(row.checkIn?.checkInDay)} - {row.checkIn?.checkInTime}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">{row.rateEmployee}</TableCell>
                                </TableRow>
                            else return null
                        })}
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
                                    count={totalPage}
                                    shape="rounded"
                                    onChange={onPageChanged} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </Grid>

    </Grid>


}
export default Report;