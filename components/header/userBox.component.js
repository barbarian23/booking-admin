
import { useState, memo } from 'react';
import styles from '../../assets/styles/userSetting.module.scss';
import Icon from '../icon.component';
import { useDispatch } from 'react-redux';
import { userAction } from '../../actions';
import { useTranslation } from 'react-i18next'

const UserBox = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    
    const onAvatarClicked = () => {
        setOpen(!open);
    }

    const onProfileBtnClicked = () => {

    }

    const onLogOutBtnClicked = () => {
        dispatch({
            type: userAction.LOG_OUT
        })
    }

    return <div className={styles.user_box} onClick={onAvatarClicked}>
        <Icon name="account-circle" />

        {open
            ? <ul className={styles.menu}>
                <li onClick={onProfileBtnClicked}>{t('header.profile')}</li>
                <li onClick={onLogOutBtnClicked}>{t('header.log_out')}</li>
            </ul>
            : null}
    </div>
}

export default memo(UserBox)