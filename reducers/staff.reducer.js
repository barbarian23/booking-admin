import { staffAction } from '../actions';

const initState = {
    staffs: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',

    selectedStaff: {
        name: '',
        staffDetails: [],
    },

    isShowAddStaffModal: false,
    branches: [],

    isShowDeleteStaffModal: false,

}

const staffReducer = (state = initState, action) => {
    switch (action.type) {
        case staffAction.GET_PAGGING_STAFFS_SUCCESS:
            return {
                ...state,
                staffs: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case staffAction.GET_PAGGING_STAFFS_FAIL:
            return {
                ...state,
                staffs: [],
            }
        case staffAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }

        case staffAction.SELECT_STAFF:
            return {
                ...state,
                selectedStaff: action.value,
            }

        //staff add modal
        case staffAction.SHOW_ADD_STAFF_MODAL:
            return {
                ...state,
                isShowAddStaffModal: true,
            }
        case staffAction.HIDE_ADD_STAFF_MODAL:
            return {
                ...state,
                isShowAddStaffModal: false,
            }

        //get combo braches
        case staffAction.GET_COMBO_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.value,
            }
        case staffAction.GET_COMBO_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            }

        //staff delete modal
        case staffAction.SHOW_DELETE_STAFF_MODAL:
            return {
                ...state,
                isShowDeleteStaffModal: true,
            }
        case staffAction.HIDE_DELETE_STAFF_MODAL:
            return {
                ...state,
                isShowDeleteStaffModal: false,
            }

        default:
            return state;
    }
}

export default staffReducer;