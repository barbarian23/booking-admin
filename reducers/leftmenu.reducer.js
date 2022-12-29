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
            name: 'store',
            isGroup: true,
            title: 'menu.stores',
            icon: 'store-front',
            // link: PAGE_URLS.STORES,
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
            ]
        }, 
        {
            name: 'order',
            isGroup: true,
            title: 'menu.orders',
            icon: 'shopping-cart',
            items: [
                {
                    name: 'booking',
                    title: 'menu.booking',
                    icon: 'add-task',
                    link: PAGE_URLS.BOOKING,
                },
                {
                    name: 'check_in',
                    title: 'menu.check_in',
                    icon: 'event-available',
                    link: PAGE_URLS.CHECK_IN,
                },
                // {
                //     name: 'customer',
                //     title: 'menu.customers',
                //     icon: 'people',
                //     link: PAGE_URLS.CUSTOMERS,
                // },
                // {
                //     name: 'storage',
                //     title: 'menu.storage',
                //     icon: 'warehouse',
                //     link: PAGE_URLS.STORAGE,
                // },
                // {
                //     name: 'payroll',
                //     title: 'menu.payroll',
                //     icon: 'currency-exchange',
                //     link: PAGE_URLS.PAYROLL,
                // }
            ]
        },
        // {
        //     name: 'booking',
        //     isGroup: true,
        //     title: 'menu.booking',
        //     icon: 'add-task',
        //     items: [
        //         {
        //             name: 'bill',
        //             title: 'menu.bills',
        //             icon: 'local-atm',
        //             link: PAGE_URLS.BILLS,
        //         },
        //         {
        //             name: 'appointment_reminder',
        //             title: 'menu.appointment_reminder',
        //             icon: 'access-alarms',
        //             link: PAGE_URLS.APPOINTMENT_REMINDER,
        //         },
        //         {
        //             name: 'customer_review',
        //             title: 'menu.customer_review',
        //             icon: 'message',
        //             link: PAGE_URLS.CUSTOMER_REVIEW,
        //         }
        //     ]
        // },
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
                    name: 'report',
                    title: 'menu.report',
                    icon: 'assessment',
                    link: PAGE_URLS.REPORT,
                },
                // {
                //     name: 'structure',
                //     title: 'menu.structure',
                //     icon: 'account-tree',
                //     link: PAGE_URLS.STRUCTURE,
                // }
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