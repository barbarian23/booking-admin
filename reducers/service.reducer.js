import { serviceAction } from '../actions';

const initState = {
    services: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',
    isLoading: false,

    selectedService: {
        name: '',
        serviceDetails: [],
    },

    isShowAddServiceModal: false,
    isShowUpdateServiceModal: false,
    branches: [],

    isShowDeleteServiceModal: false,

    isShowServiceDetailsModal: false,
    isShowAddServiceDetailModal: false,
    isShowUpdateServiceDetailModal: false,

    selectedServiceDetail: {
        id: 0,
    },

    isShowDeleteServiceDetailModal: false,
}

const serviceReducer = (state = initState, action) => {
    switch (action.type) {
        case serviceAction.CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.value,
            }
        case serviceAction.GET_PAGGING_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case serviceAction.GET_PAGGING_SERVICES_FAIL:
            return {
                ...state,
                services: [],
            }
        case serviceAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }

        case serviceAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }

        case serviceAction.SELECT_SERVICE:
            return {
                ...state,
                selectedService: action.value,
            }
        //add service modal
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

        //update service modal
        case serviceAction.SHOW_UPDATE_SERVICE_MODAL:
            return {
                ...state,
                isShowUpdateServiceModal: true,
            }
        case serviceAction.HIDE_UPDATE_SERVICE_MODAL:
            return {
                ...state,
                isShowUpdateServiceModal: false,
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

        //delete service modal
        case serviceAction.SHOW_DELETE_SERVICE_MODAL:
            return {
                ...state,
                isShowDeleteServiceModal: true,
            }
        case serviceAction.HIDE_DELETE_SERVICE_MODAL:
            return {
                ...state,
                isShowDeleteServiceModal: false,
            }

        //service details modal
        case serviceAction.SHOW_SERVICE_DETAILS_MODAL:
            return {
                ...state,
                isShowServiceDetailsModal: true,
            }
        case serviceAction.HIDE_SERVICE_DETAILS_MODAL:
            return {
                ...state,
                isShowServiceDetailsModal: false,
            }

        //add service details modal
        case serviceAction.SHOW_ADD_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowAddServiceDetailModal: true,
            }
        case serviceAction.HIDE_ADD_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowAddServiceDetailModal: false,
            }

        //update service details modal
        case serviceAction.SHOW_UPDATE_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowUpdateServiceDetailModal: true,
            }
        case serviceAction.HIDE_UPDATE_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowUpdateServiceDetailModal: false,
            }

        case serviceAction.SELECTE_SERVICE_DETAIL:
            return {
                ...state,
                selectedServiceDetail: action.value,
            }

        //delete service details modal
        case serviceAction.SHOW_DELETE_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowDeleteServiceDetailModal: true,
            }
        case serviceAction.HIDE_DELETE_SERVICE_DETAIL_MODAL:
            return {
                ...state,
                isShowDeleteServiceDetailModal: false,
            }

        default:
            return state;
    }
}

export default serviceReducer;