import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';
import { branchAction } from '../../actions';
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/branches.module.scss';
import AddBranchModal from '../../components/branches/addBranch.modal';
import DeleteBranchModal from '../../components/branches/deleteBranch.modal';

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

const Branches = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { branches, isLoading, page, totalPage } = useSelector(state => state.branch);

    useEffect(() => {
        dispatch({
            type: branchAction.GET_PAGGING_BRANCHES,
        });
    }, []);

    const showBranchDetails = (branch) => {
        dispatch({
            type: branchAction.SELECT_BRANCH,
            value: branch
        });
    }

    const onAddBtnClicked = () => {
        dispatch({
            type: branchAction.SHOW_ADD_BRANCH_MODAL,
        });
    }

    const onDeleteBtnClicked = (branch) => {
        dispatch({
            type: branchAction.SELECT_BRANCH,
            value: branch
        });
        dispatch({
            type: branchAction.SHOW_DELETE_BRANCH_MODAL,
            value: branch
        });
    }

    const onPageChanged = (event, page) => {
        dispatch({
            type: branchAction.PAGE_CHANGE,
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
                    {t('menu.branches')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.branches')}</h3>
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
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.id')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.name')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.address')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.hot_line')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.status')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.created_date')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.modifided_date')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '700' }}>{t('branch.action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{row.hotLine}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
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
                                            onClick={() => { onDeleteBtnClicked(row) }}
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
                                            onClick={() => { showBranchDetails(row) }}
                                        >
                                            {t('button.stores')}
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
                </TableContainer>}
        </Grid>

        <AddBranchModal />
        <DeleteBranchModal />
    </Grid>


}
export default Branches;