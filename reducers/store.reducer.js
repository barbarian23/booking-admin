import { storeAction } from '../actions';

const initState = {
    stores: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',

    selectedStaff: {
        name: '',
        storeDetails: [],
    },

    isShowAddStaffModal: false,
    branches: [],

    isShowDetailStaffModal: false,

    isShowDeleteStaffModal: false,

}

const storeReducer = (state = initState, action) => {
    switch (action.type) {
        case storeAction.GET_PAGGING_STORES_SUCCESS:
            return {
                ...state,
                stores: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case storeAction.GET_PAGGING_STORES_FAIL:
            return {
                ...state,
                stores: [],
            }
        case storeAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }
        case storeAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }

        case storeAction.SELECT_STORE:
            return {
                ...state,
                selectedStaff: action.value,
            }

        //store add modal
        case storeAction.SHOW_ADD_STORE_MODAL:
            return {
                ...state,
                isShowAddStaffModal: true,
            }
        case storeAction.HIDE_ADD_STORE_MODAL:
            return {
                ...state,
                isShowAddStaffModal: false,
            }

        //get combo braches
        case storeAction.GET_COMBO_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.value,
            }
        case storeAction.GET_COMBO_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            }

        //store detail modal
        case storeAction.SHOW_DETAIL_STORE_MODAL:
            return {
                ...state,
                isShowDetailStaffModal: true,
            }
        case storeAction.HIDE_DETAIL_STORE_MODAL:
            return {
                ...state,
                isShowDetailStaffModal: false,
            }

        //store delete modal
        case storeAction.SHOW_DELETE_STORE_MODAL:
            return {
                ...state,
                isShowDeleteStaffModal: true,
            }
        case storeAction.HIDE_DELETE_STORE_MODAL:
            return {
                ...state,
                isShowDeleteStaffModal: false,
            }

        default:
            return state;
    }
}

export default storeReducer;