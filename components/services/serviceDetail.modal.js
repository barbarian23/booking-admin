import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ServiceDetailModal = ({ service }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowServiceDetails } = useSelector(state => state.service);
    const { serviceDetails } = service;

    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_SERVICE_DETAILS_MODAL,
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <Modal
        open={isShowServiceDetails}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {service?.name}
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.id')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.name')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.branch')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.created_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.modifided_date')}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700' }}>{t('service.action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center" sx={{ fontWeight: '700' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.branch.name}</TableCell>
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
                                        onClick={() => { showServiceDetails(row) }}
                                    >
                                        {t('button.detail')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Modal>

}
export default memo(ServiceDetailModal);