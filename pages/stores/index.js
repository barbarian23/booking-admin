import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { storeAction } from '../../actions';
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/stores.module.scss';
// import AddStoreModal from '../../components/stores/addStore.modal';
// import DeleteStoreModal from '../../components/stores/deleteStore.modal';
// import DetailStoreModal from '../../components/stores/detailStore.modal';

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

const Stores = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { stores, page, totalPage } = useSelector(state => state.store);

    useEffect(() => {
        dispatch({
            type: storeAction.GET_PAGGING_STORES,
        });
    }, []);

    const showStoreDetails = (store) => {
        dispatch({
            type: storeAction.SELECT_STORE,
            value: store
        });

        dispatch({
            type: storeAction.SHOW_DETAIL_STORE_MODAL,
            value: store
        }); 
    }

    const onAddBtnClicked = () => {
        dispatch({
            type: storeAction.SHOW_ADD_STORE_MODAL,
        }); 
    }

    const onDeleteBtnClicked = (store) => {
        dispatch({
            type: storeAction.SELECT_STORE,
            value: store
        }); 

        dispatch({
            type: storeAction.SHOW_DELETE_STORE_MODAL,
            value: store
        }); 
    }

    const onPageChanged = (event, page) => {
        dispatch({
            type: storeAction.PAGE_CHANGE,
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
                    {t('menu.stores')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.stores')}</h3>
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
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.id')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.code')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.name')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.phone')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.created_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.modifided_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('store.action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.code}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
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
                                        onClick={() => {showStoreDetails(row)}}
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
                                    count={totalPage} 
                                    shape="rounded"
                                    onChange={onPageChanged} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </Grid>
{/* 
        <AddStoreModal />
        <DetailStoreModal />
        <DeleteStoreModal /> */}
    </Grid>


}
export default Stores;