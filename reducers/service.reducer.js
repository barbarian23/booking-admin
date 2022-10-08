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
    isShowServiceDetails: false,
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
        case serviceAction.SHOW_SERVICE_DETAILS_MODAL:
            return {
                ...state,
                isShowServiceDetails: true,
            }
        case serviceAction.HIDE_SERVICE_DETAILS_MODAL:
            return {
                ...state,
                isShowServiceDetails: false,
            }

        default:
            return state;
    }
}

export default serviceReducer;