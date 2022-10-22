import React, { useState, memo } from 'react';
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import styles from '../../assets/styles/leftMenu.module.scss'

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Icon from '../icon.component';

const NestedList = ({ group }) => {
    const router = useRouter()
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const onItemClicked = (item) => {
        router.push(item.link)
    }

    return <React.Fragment>
        <ListItemButton className={styles.items_group} onClick={handleClick} >
            <ListItemIcon>
                <Icon name={group.icon} />
            </ListItemIcon>
            <ListItemText primary={t(group.title)} />
            {open ? <ExpandMore /> : <ExpandLess /> }
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {group.items.map((item) => {
                    return <ListItemButton key={item.name} onClick={() => onItemClicked(item)}>
                        <ListItemIcon>
                            <Icon name={item.icon} />
                        </ListItemIcon>
                        <ListItemText primary={t(item.title)} />
                    </ListItemButton>
                })}
            </List>
        </Collapse>
    </React.Fragment>
}

export default memo(NestedList);