import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux"

import Item from './item.component'
import NestedList from './netstedList.component'

const LeftMenu = () => {
    const router = useRouter()
    const { t, i18n } = useTranslation();
    const { menu, selectedItem } = useSelector(state => state.leftMenu);

    return <React.Fragment>
        {menu.map((item) => {
            if(item.isGroup){
                return <NestedList key={item.name} group={item} />
            }else{
                return <Item key={item.name} item={item}/>
            }
        })}
    </React.Fragment>

}
export default memo(LeftMenu);