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

const AddStaffModal = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let { isShowAddStaffModal, branches } = useSelector(state => state.staff);
    const [options, setOptions] = useState([]);
    const [branchId, setBranchId] = useState(0);
    const [dob, setDoB] = useState(new Date());
    const [fullName, setFullName] = useState('');
    const [passCode, setPassCode] = useState('');
    const [idCard, setIdCard] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isManager, setIsManager] = useState('');

    const levelOptions = [
        {
            label: 'A',
            value: 'A',
        }, {
            label: 'B',
            value: 'B',
        }, {
            label: 'C',
            value: 'C',
        }, {
            label: 'D',
            value: 'D',
        },

    ]
    const [level, setLevel] = useState('');

    useEffect(() => {
        if (isShowAddStaffModal) {
            dispatch({
                type: staffAction.GET_COMBO_BRANCHES,
            });
        }
    }, [isShowAddStaffModal]);

    useEffect(() => {
        setOptions(branches.map((branch) => {
            return {
                ...branch,
                label: branch.title,
                id: branch.value,
            }
        }));
    }, [branches]);

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

    const onIsManagerChanged = (e) => {
        setIsManager(e.target.checked);
    }

    const handleClose = () => {
        dispatch({
            type: staffAction.HIDE_ADD_STAFF_MODAL,
        });
    }

    const handleSave = () => {
        dispatch({
            type: staffAction.ADD_STAFF,
            value: {
                fullName: fullName,
                idCard: idCard,
                phone: phone,
                dob: dob,
                address: address,
                branchId: branchId,
                isManager: isManager,
                level: level,
                passCode: passCode,
            }
        });
        dispatch({
            type: staffAction.HIDE_ADD_STAFF_MODAL,
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
        open={isShowAddStaffModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} >
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {t('staff.add_staff')}
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
                                options={options}
                                getOptionLabel={option => option.title}
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

                    {/* branch */}
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
                                sx={{ p: 0 }}
                                renderInput={(params) => <TextField
                                    {...params} />}
                            />
                        </div>

                    </li>

                    {/* is manager */}
                    <li>
                        <div>
                            <Checkbox onChange={onIsManagerChanged} />
                            <span>{t('staff.is_manager')}</span>
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
                        fontWeight: '700'
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
export default memo(AddStaffModal);