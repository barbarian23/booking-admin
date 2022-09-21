import { leftMenuAction } from '../actions';

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
            title: 'menu.orders_manager',
            icon: '',
        }, {
            name: 'service',
            title: 'menu.services_manager',
            icon: '',
        }
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