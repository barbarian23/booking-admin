import { checkInAction } from '../actions';

const initState = {
    customers: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',
    isLoading: false,

    selectedCustomer: {},

    branches: [],
    levels: [],

    isShowDetailCheckInModal: false,
}

const checkinReducer = (state = initState, action) => {
    switch (action.type) {
        case checkInAction.CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.value,
            }
        case checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS_FAIL:
            return {
                ...state,
                customers: [],
            }
        case checkInAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }
        case checkInAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }

        case checkInAction.SELECT_CHECK_IN_CUSTOMER:
            return {
                ...state,
                selectedCustomer: action.value,
            }

        //get combo braches
        case checkInAction.GET_COMBO_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.value,
            }
        case checkInAction.GET_COMBO_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            }

        //get combo braches
        case checkInAction.GET_COMBO_LEVELS_SUCCESS:
            return {
                ...state,
                levels: action.value,
            }
        case checkInAction.GET_COMBO_LEVELS_FAIL:
            return {
                ...state,
                levels: [],
            }

        //checkin detail modal
        case checkInAction.SHOW_DETAIL_CHECK_IN_MODAL:
            return {
                ...state,
                isShowDetailCheckInModal: true,
            }
        case checkInAction.HIDE_DETAIL_CHECK_IN_MODAL:
            return {
                ...state,
                isShowDetailCheckInModal: false,
            }
            
        default:
            return state;
    }
}

export default checkinReducer;