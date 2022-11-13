import { branchAction } from '../actions';

const initState = {
    branches: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',

    selectedBranch: {
        name: '',
        branchDetails: [],
    },

    isShowAddBranchModal: false,
    branches: [],

    isShowDeleteBranchModal: false,
}

const branchReducer = (state = initState, action) => {
    switch (action.type) {
        case branchAction.GET_PAGGING_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case branchAction.GET_PAGGING_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            }
        case branchAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }

        case branchAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }


        case branchAction.SELECT_BRANCH:
            return {
                ...state,
                selectedBranch: action.value,
            }
        //branch details modal
        case branchAction.SHOW_ADD_BRANCH_MODAL:
            return {
                ...state,
                isShowAddBranchModal: true,
            }
        case branchAction.HIDE_ADD_BRANCH_MODAL:
            return {
                ...state,
                isShowAddBranchModal: false,
            }

        //branch details modal
        case branchAction.SHOW_DELETE_BRANCH_MODAL:
            return {
                ...state,
                isShowDeleteBranchModal: true,
            }
        case branchAction.HIDE_DELETE_BRANCH_MODAL:
            return {
                ...state,
                isShowDeleteBranchModal: false,
            }
        default:
            return state;
    }
}

export default branchReducer;