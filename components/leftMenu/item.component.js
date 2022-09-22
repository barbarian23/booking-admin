import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '../icon.component';

const Item = ({ item }) => {
    const router = useRouter()
    const { t, i18n } = useTranslation();

    const onItemClicked = (item) => {
        router.push(item.link)
    }

    return <React.Fragment>
        <ListItemButton key={item.name} onClick={() => { onItemClicked(item) }}>
            <ListItemIcon>
                <Icon name={item.icon} />
            </ListItemIcon>
            <ListItemText primary={t(item.title)} />
        </ListItemButton>
    </React.Fragment>

}
export default Item;