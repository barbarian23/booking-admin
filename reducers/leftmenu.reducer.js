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
                    name: 'branch',
                    title: 'menu.branches',
                    icon: 'mediation',
                    link: PAGE_URLS.BRANCHES,
                },
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
                    link: PAGE_URLS.CUSTOMERS,
                },
                {
                    name: 'staff_schedule',
                    title: 'menu.staff_schedule',
                    icon: 'event-available',
                    link: PAGE_URLS.STAFF_SCHEDULE,
                },
                {
                    name: 'storage',
                    title: 'menu.storage',
                    icon: 'warehouse',
                    link: PAGE_URLS.STORAGE,
                },
                {
                    name: 'payroll',
                    title: 'menu.payroll',
                    icon: 'currency-exchange',
                    link: PAGE_URLS.PAYROLL,
                }
            ]
        },
        {
            name: 'booking',
            isGroup: true,
            title: 'menu.booking',
            icon: 'add-task',
            items: [
                {
                    name: 'bill',
                    title: 'menu.bills',
                    icon: 'local-atm',
                    link: PAGE_URLS.BILLS,
                },
                {
                    name: 'appointment_reminder',
                    title: 'menu.appointment_reminder',
                    icon: 'access-alarms',
                    link: PAGE_URLS.APPOINTMENT_REMINDER,
                },
                {
                    name: 'customer_review',
                    title: 'menu.customer_review',
                    icon: 'message',
                    link: PAGE_URLS.CUSTOMER_REVIEW,
                }
            ]
        },
        {
            name: 'staff',
            isGroup: true,
            title: 'menu.staffs',
            icon: 'manager-accounts',
            items: [
                {
                    name: 'staffs_list',
                    title: 'menu.staffs_list',
                    icon: 'switch-account',
                    link: PAGE_URLS.STAFFS,
                },
                {
                    name: 'structure',
                    title: 'menu.structure',
                    icon: 'account-tree',
                    link: PAGE_URLS.STRUCTURE,
                }
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