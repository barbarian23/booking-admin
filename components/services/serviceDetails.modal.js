import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';
import styles from '../../assets/styles/addStaff.module.scss';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ServiceDetailsModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowServiceDetailsModal, selectedService } = useSelector(state => state.service);

    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_SERVICE_DETAILS_MODAL,
        });
    }

    const onAddBtnClicked = () => {
        dispatch({
            type: serviceAction.SHOW_ADD_SERVICE_DETAIL_MODAL,
        }); 
    }

    const onDeleteBtnClicked = (serviceDetail) => {
        dispatch({
            type: serviceAction.SELECTE_SERVICE_DETAIL,
            value: serviceDetail
        }); 
        dispatch({
            type: serviceAction.SHOW_DELETE_SERVICE_DETAIL_MODAL,
        }); 
    }

    const onUpdateBtnClicked = (serviceDetail) => {
        dispatch({
            type: serviceAction.SELECTE_SERVICE_DETAIL,
            value: serviceDetail
        }); 
        dispatch({
            type: serviceAction.SHOW_UPDATE_SERVICE_DETAIL_MODAL,
        }); 
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <Modal
        open={isShowServiceDetailsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Grid container>
                <Grid item xs={8}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {selectedService?.name}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ m: 2, float: 'right' }}
                        onClick={onAddBtnClicked}
                    >
                        {t('button.add')}
                    </Button>
                </Grid>

            </Grid>


            <Grid container sx={{maxHeight: 600, overflowY: 'scroll'}}>
                {/* <TableContainer component={Paper}> */}
                <Table sx={{ minWidth: 650, mb: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.id')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.name')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.code')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.price')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.time')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.turn')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.supply')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.created_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.modifided_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedService?.serviceDetails.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row?.name}</TableCell>
                                <TableCell align="center">{row?.code}</TableCell>
                                <TableCell align="center">{row?.price}</TableCell>
                                <TableCell align="center">{row?.time}</TableCell>
                                <TableCell align="center">{row?.turn}</TableCell>
                                <TableCell align="center">{row?.supply}</TableCell>
                                <TableCell align="center">{row?.createdDate}</TableCell>
                                <TableCell align="center">{row?.modifiedDate}</TableCell>
                                <TableCell align="center" className={styles.buttons}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            fontSize: 14,
                                            fontWeight: '700'
                                        }}
                                        onClick={() => { onUpdateBtnClicked(row) }}
                                    >
                                        {t('button.update')}
                                    </Button>
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
                                </TableCell>
                            </TableRow>
                        ))}

                        {selectedService?.serviceDetails.length == 0 
                            ? <TableRow sx={{textAlign: 'center'}}>
                                <TableCell align="center" colSpan={8}>
                                    <b >No data</b> 
                                </TableCell>
                            </TableRow>
                            : null}
                    </TableBody>
                </Table>
                {/* </TableContainer> */}
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
export default memo(ServiceDetailsModal);