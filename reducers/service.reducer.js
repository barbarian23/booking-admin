import { serviceAction } from '../actions';

const initState = {
    services: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',

    selectedService: {
        name: '',
        serviceDetails: [],
    },

    isShowAddServiceModal: false,
    branches: [],
}

const serviceReducer = (state = initState, action) => {
    switch (action.type) {
        case serviceAction.GET_ALL_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case serviceAction.GET_ALL_SERVICES_FAIL:
            return {
                ...state,
                services: [],
            }
        case serviceAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }

        case serviceAction.SELECT_SERVICE:
            return {
                ...state,
                selectedService: action.value,
            }
        //service details modal
        case serviceAction.SHOW_ADD_SERVICE_MODAL:
            return {
                ...state,
                isShowAddServiceModal: true,
            }
        case serviceAction.HIDE_ADD_SERVICE_MODAL:
            return {
                ...state,
                isShowAddServiceModal: false,
            }

        //get combo braches
        case serviceAction.GET_COMBO_BRANCHES_SUCCESS:
            console.log(action.value)
            return {
                ...state,
                branches: action.value,
            }
        case serviceAction.GET_COMBO_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            }
        default:
            return state;
    }
}

export default serviceReducer;