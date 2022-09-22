import { leftMenuAction } from '../actions';
import { PAGE_URLS } from '../constants/urls';

const initState = {
    isCollapsed: true,
    selectedItem: {
        name: '',
        title: '',
        icon: '',
    },
    menu: [
        {
            name: 'order',
            isGroup: false,
            title: 'menu.orders',
            icon: 'shopping-cart',
            link: PAGE_URLS.ORDERS,
        }, 
        {
            name: 'store',
            isGroup: true,
            title: 'menu.stores',
            icon: 'store-front',
            items: [
                {
                    name: 'service',
                    title: 'menu.services',
                    icon: 'layers',
                    link: PAGE_URLS.SERVICES,
                },
                {
                    name: 'customer',
                    title: 'menu.customers',
                    icon: 'people',
                    link: PAGE_URLS.SERVICES,
                }
            ]
        },
        {
            name: 'booking',
            isGroup: true,
            title: 'menu.booking',
            icon: 'add-task',
            items: [
            ]
        },
        {
            name: 'staff',
            isGroup: true,
            title: 'menu.staffs',
            icon: 'manager-accounts',
            items: [
            ]
        },
    ]
};

const leftMenuReducer = (state = initState, action) => {
    switch (action.type) {
        case leftMenuAction.COLLAPSE:
            return {
                isCollapsed: true,
                ...state,
            }
        case leftMenuAction.SELECT_ITEM:
            return {
                selectedItem: action.value,
                ...state,
            }
        default:
            return state;
    }
}

export default leftMenuReducer;