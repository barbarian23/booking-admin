import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { serviceAction } from '../../actions';
import styles from '../../assets/styles/addService.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';

const AddServiceDetailModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowAddServiceDetailModal, selectedService } = useSelector(state => state.service);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [time, setTime] = useState(0);
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#000000');
    const [redColor, setRedColor] = useState(0);
    const [greenColor, setGreenColor] = useState(0);
    const [blueColor, setBlueColor] = useState(0);
    const [turn, setTurn] = useState(1);
    const [supply, setSupply] = useState(0);

    useEffect(() => {
        //reset
        setName('');
        setPrice(0);
        setTime(0);
        setDescription('');
        setColor('#000000');
        setTurn('');
    }, [isShowAddServiceDetailModal]);

    const onNameChanged = (e) => {
        setName(e.target.value)
    }

    const onPriceChanged = (e) => {
        setPrice(e.target.value)
    }

    const onTimeChanged = (e) => {
        setTime(e.target.value)
    }

    const onDescriptionChanged = (e) => {
        setDescription(e.target.value)
    }

    const onColorChanged = (color) => {
        setColor(color.hex);
        setRedColor(color.rgb.r);
        setGreenColor(color.rgb.g);
        setBlueColor(color.rgb.b);
    }

    const onTurnChanged = (e) => {
        setTurn(e.target.value)
    }

    const onSupplyChanged = (e) => {
        setSupply(e.target.value)
    }

    const handleClose = () => {
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_DETAIL_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: serviceAction.ADD_SERVICE_DETAIL,
            value: {
                name : name,
                price : price,
                time : time,
                description : description,
                colorCode: `${redColor}:${greenColor}:${blueColor}`,
                serviceId : selectedService.id,
                turn: turn,
                supply: supply,
            }
        });
        dispatch({
            type: serviceAction.HIDE_ADD_SERVICE_DETAIL_MODAL,
        });
        dispatch({
            type: serviceAction.HIDE_SERVICE_DETAILS_MODAL,
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <Modal
        open={isShowAddServiceDetailModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('service.add_service_detail')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.name')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="name"
                                value={name}
                                sx={{ p: 0 }}
                                onChange={onNameChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.price')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="price"
                                type="number"
                                value={price}
                                sx={{ p: 0 }}
                                onChange={onPriceChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.time')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="time"
                                type="number"
                                value={time}
                                sx={{ p: 0 }}
                                onChange={onTimeChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.description')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="description"
                                value={description}
                                sx={{ p: 0 }}
                                onChange={onDescriptionChanged}
                            />
                        </div>
                    </li>

                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.color_code')}</span>
                        </div>

                        <div className={styles.input}>
                            {/* <TextField
                                fullWidth
                                size="small"
                                id="description"
                                value={description}
                                sx={{ p: 0 }}
                                onChange={onDescriptionChanged}
                            /> */}
                            <SketchPicker 
                                color={color}
                                onChange={onColorChanged}
                            />
                        </div>
                    </li>

                    {/* turn */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.turn')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="turn"
                                type="number"
                                value={turn}
                                sx={{ p: 0 }}
                                onChange={onTurnChanged}
                            />
                        </div>
                    </li>

                    {/* supply */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('service.supply')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="supply"
                                type="number"
                                value={supply}
                                sx={{ p: 0 }}
                                onChange={onSupplyChanged}
                            />
                        </div>
                    </li>
                </ul>
            </Grid>

            <Grid container>
                <Button
                    variant="contained"
                    color="success"
                    className={styles.btn}
                    sx={{
                        fontSize: 14,
                        fontWeight: '700',
                        mr: 1,
                    }}
                    onClick={handleSave}
                >
                    {t('button.add')}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    className={styles.btn}
                    sx={{
                        fontSize: 14,
                        fontWeight: '700'
                    }}
                    onClick={handleClose}
                >
                    {t('button.cancel')}
                </Button>
            </Grid>
        </Box>
    </Modal>

}
export default memo(AddServiceDetailModal);