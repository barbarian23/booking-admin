import React from 'react'
import { useTranslation } from 'react-i18next'

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

const Orders = () => {
    const { t, i18n } = useTranslation();

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
                    {t('menu.orders')}
                </Typography>
            </Breadcrumbs>
        </Box>

        <Grid container>
            <Grid item xs={10}>
                <h3>{t('menu.orders')}</h3>
            </Grid>
            <Grid item
                xs={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ m: 2 }}
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
                            <TableCell>ID</TableCell>
                            <TableCell align="right">{t('orders.customer')}</TableCell>
                            <TableCell align="right">{t('orders.service')}</TableCell>
                            <TableCell align="right">{t('orders.quantity')}</TableCell>
                            <TableCell align="right">{t('orders.total')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>

                <Box>
                    <Grid container>
                        <Grid item lg={6}>
                        </Grid>
                        <Grid item lg={6}
                            sx={{ display: 'flex', justifyContent: 'flex-end', height: "3em", mt: 2 }}>
                            <Stack spacing={2}>
                                <Pagination count={10} shape="rounded" />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </Grid>
    </Grid>


}
export default Orders;