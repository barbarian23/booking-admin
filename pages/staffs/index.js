import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { staffAction } from '../../actions';
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/staffs.module.scss';
import AddStaffModal from '../../components/staffs/addStaff.modal';
import DeleteStaffModal from '../../components/staffs/deleteStaff.modal';

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
import AddIcon from '@mui/icons-material/Add';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Staffs = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { staffs, page, totalPage } = useSelector(state => state.staff);

    useEffect(() => {
        dispatch({
            type: staffAction.GET_PAGGING_STAFFS,
        });
    }, []);

    const showStaffDetails = (staff) => {
        dispatch({
            type: staffAction.SELECT_STAFF,
            value: staff
        });
    }

    const onAddBtnClicked = () => {
        dispatch({
            type: staffAction.SHOW_ADD_STAFF_MODAL,
        }); 
    }

    const onDeleteBtnClicked = (staff) => {
        dispatch({
            type: staffAction.SELECT_STAFF,
            value: staff
        }); 

        dispatch({
            type: staffAction.SHOW_DELETE_STAFF_MODAL,
            value: staff
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
                    {t('menu.staffs')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.staffs')}</h3>
            </Grid>
            <Grid item
                xs={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ m: 2 }}
                    onClick={onAddBtnClicked}
                >
                    {t('button.add')}
                </Button>
            </Grid>
        </Grid>

        <Grid container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.id')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.code')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.full_name')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.phone')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.created_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.modifided_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('staff.action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.code}</TableCell>
                                <TableCell align="center">{row.fullName}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.createdDate}</TableCell>
                                <TableCell align="center">{row.modifiedDate}</TableCell>
                                <TableCell align="center" className={styles.buttons}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{
                                            fontSize: 14,
                                            fontWeight: '700'
                                        }}
                                        onClick={() => {onDeleteBtnClicked(row)}}
                                    >
                                        {t('button.delete')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            fontSize: 14,
                                            fontWeight: '700'
                                        }}
                                        onClick={() => {showStaffDetails(row)}}
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
                                <Pagination count={totalPage} shape="rounded" />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </Grid>

        <AddStaffModal />
        <DeleteStaffModal />
    </Grid>


}
export default Staffs;