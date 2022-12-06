import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { staffAction } from '../../actions';
import styles from '../../assets/styles/addStaff.module.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

import {dtStr2ISODateStr} from '../../services/utils/time';

const UpdateStaffModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowUpdateStaffModal, branches, levels, selectedStaff } = useSelector(state => state.staff);
    const [branchOptions, setBranchOptions] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [branchId, setBranchId] = useState(0);
    const [fullName, setFullName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDoB] = useState('');
    const [address, setAddress] = useState('');
    const [level, setLevel] = useState('');
    const [passCode, setPassCode] = useState('');
    const [rate, setRate] = useState(0);
    // const [isManager, setIsManager] = useState('');


    useEffect(() => {
        setBranchId(selectedStaff?.branchStore?.id ? selectedStaff.branchStore.id : '');
        setFullName(selectedStaff.fullName ? selectedStaff.fullName : '');
        setIdCard(selectedStaff.idCard ? selectedStaff.idCard : '');
        setPhone(selectedStaff.phone ? selectedStaff.phone : 0);
        setDoB(selectedStaff.dob ? dtStr2ISODateStr(selectedStaff.dob) : '');
        setAddress(selectedStaff.address ? selectedStaff.address : '');
        setLevel(selectedStaff.level ? selectedStaff.level : 0);
        setPassCode(selectedStaff.code ? selectedStaff.code : '');
        setRate(selectedStaff.rate ? selectedStaff.rate : 0);
        // setIsManager(selectedStaff.isManager ? selectedStaff.isManager : false);

        if (isShowUpdateStaffModal) {
            dispatch({
                type: staffAction.GET_COMBO_BRANCHES,
            });

            dispatch({
                type: staffAction.GET_COMBO_LEVELS,
            });
        }

    }, [isShowUpdateStaffModal]);

    useEffect(() => {
        setBranchOptions(branches.map((branch) => {
            return {
                // ...branch,
                id: Number(branch.value),
                label: branch.title,
            }
        }));

    }, [branches]);

    useEffect(() => {
        setLevelOptions(levels.map((level) => {
            return {
                ...level,
                id: level.value,
                label: level.title,
            }
        }));
    }, [levels]);

    
    const getLevelOption = (id) =>{
        for(let i = 0; i<levels.lenght ; i++){
            if(id==levels[i].id){
                return {
                    id: levels[i].value,
                    label: levels[i].title,
                }
            }
        }
        return null
    }

    const onBranchIdSelected = (e) => {
        let index = e.target.dataset.optionIndex
        if (index >= 0) {
            setBranchId(Number(branches[index].value));
        } else {
            setBranchId(-1);
        }
    }

    const onFullNameChanged = (e) => {
        setFullName(e.target.value)
    }

    const onPassCodeChanged = (e) => {
        setPassCode(e.target.value)
    }

    const onDoBChanged = (e) => {
        setDoB(e.target.value);
    }

    const onIdCardChanged = (e) => {
        setIdCard(e.target.value)
    }

    const onAddressChanged = (e) => {
        setAddress(e.target.value)
    }

    const onPhoneChanged = (e) => {
        setPhone(e.target.value)
    }

    const onLevelSelected = (e) => {
        let index = e.target.dataset.optionIndex
        if (index >= 0) {
            setLevel(levelOptions[index].value);
        } else {
            setLevel('');
        }
    }

    const onRateChanged = (e) => {
        setRate(e.target.value)
    }

    // const onIsManagerChanged = (e) => {
    //     setIsManager(e.target.checked);
    // }

    const handleClose = () => {
        dispatch({
            type: staffAction.HIDE_UPDATE_STAFF_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: staffAction.UPDATE_STAFF,
            value: {
                id: selectedStaff.id,
                fullName : fullName,
                idCard : idCard,
                phone : phone,
                dob : dob,
                address : address, 
                branchId : branchId,
                // isManager : isManager,
                level : level,
                passCode : passCode,
                rate: rate,
            }
        });
        dispatch({
            type: staffAction.HIDE_UPDATE_STAFF_MODAL,
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
        open={isShowUpdateStaffModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('staff.update_staff')}
            </Typography>

            <Grid container>
                <ul className={styles.form}>
                    {/* fullName */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.full_name')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="full-name"
                                value={fullName}
                                sx={{ p: 0 }}
                                onChange={onFullNameChanged}
                            />
                        </div>
                    </li>

                    {/* passCode */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.pass_code')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="pass-code"
                                value={passCode}
                                sx={{ p: 0 }}
                                onChange={onPassCodeChanged}
                            />
                        </div>
                    </li>

                    {/* branch */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.branch')}</span>
                        </div>

                        <div className={styles.input}>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="branch-id"
                                options={branchOptions}
                                defaultValue={{
                                    id: selectedStaff.branchStore?.id,
                                    label: selectedStaff.branchStore?.name,
                                }}
                                getOptionLabel={option => option.label}
                                isOptionEqualToValue={option => option.id}
                                onChange={onBranchIdSelected}
                                sx={{ p: 0 }}
                                renderInput={(params) => <TextField
                                    {...params} />}
                            />
                        </div>

                    </li>

                    {/* dob */}
                    <li>

                        <div className={styles.input_title}>
                            <span>{t('staff.dob')}</span>
                        </div>

                        <div className={styles.input}>
                            <input
                                type="date"
                                placeholder="Date of birth"
                                className={styles.date_picker}
                                value={dob}
                                onChange={onDoBChanged} />
                        </div>
                    </li>

                    {/* idCard */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.id_card')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="id-card"
                                value={idCard}
                                sx={{ p: 0 }}
                                onChange={onIdCardChanged}
                            />
                        </div>
                    </li>

                    {/* phone */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.phone')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="phone"
                                // type="number"
                                value={phone}
                                sx={{ p: 0 }}
                                onChange={onPhoneChanged}
                            />
                        </div>
                    </li>

                    {/* address */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.address')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                fullWidth
                                size="small"
                                id="address"
                                value={address}
                                sx={{ p: 0 }}
                                onChange={onAddressChanged}
                            />
                        </div>
                    </li>

                    {/* level */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.level')}</span>
                        </div>

                        <div className={styles.input}>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="level"
                                options={levelOptions}
                                onChange={onLevelSelected}
                                defaultValue={getLevelOption(selectedStaff.level)}
                                sx={{ p: 0 }}
                                renderInput={(params) => <TextField
                                    {...params} />}
                            />
                        </div>
                    </li>

                    {/* rate */}
                    <li>
                        <div className={styles.input_title}>
                            <span>{t('staff.rate')}</span>
                        </div>

                        <div className={styles.input}>
                            <TextField
                                
                                size="small"
                                id="rate"
                                type="number"
                                value={rate}
                                sx={{ p: 0 }}
                                onChange={onRateChanged}
                            />
                            <span 
                                style={{    
                                    display: 'inline-flex',
                                    marginTop: 10,
                                    marginLeft: 10
                                }} 
                            > % </span>
                        </div>
                    </li>

                    {/* is manager */}
                    {/* <li>
                        <div>
                            <Checkbox onChange={onIsManagerChanged} value={isManager}/>
                            <span>{t('staff.is_manager')}</span>
                        </div>
                    </li> */}
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
                    {t('button.update')}
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
export default memo(UpdateStaffModal);