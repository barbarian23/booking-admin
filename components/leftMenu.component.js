import { memo } from "react"
import styles from '../assets/styles/leftMenu.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux"

const LeftMenu = () => {
    const { t, i18n } = useTranslation();
    const { menu, selectedItem} = useSelector(state => state.leftMenu);

    return <div className={styles.left_menu}>
        {menu.map((item)=>{
            return <div key={item.name}> 
                <p className={styles.item_title}>{t(item.title)}</p>
            </div>
        })}
    </div>
}
export default memo(LeftMenu);