import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { branchAction, userAction } from "../actions";
import { branchApi } from "../services/api";

const getPaggingBranchesSage = function* (action) {
    const branch = yield select(state => state.branch);
    const { page, pageSize } = branch;
    try {
        let response = yield call(branchApi.getPagging, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: branchAction.GET_PAGGING_BRANCHES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: branchAction.GET_PAGGING_BRANCHES_FAIL,
                value: ''
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
        } else {
            yield put({
                type: branchAction.GET_PAGGING_BRANCHES_FAIL,
                value: errorMsg
            });
        }
    }
};


const addBranchSaga = function* (action) {
    const { name, address, hotLine, description } = action.value;
    try {
        let response = yield call(branchApi.add, name, address, hotLine, description);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: branchAction.ADD_BRANCH_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: branchAction.ADD_BRANCH_FAIL,
                value: ''
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
        } else {
            yield put({
                type: branchAction.ADD_BRANCH_FAIL,
                value: errorMsg
            });
        }
    }
};

const deleteBranchSaga = function* (action) {
    const { branchId } = action.value;
    try {
        let response = yield call(branchApi.delete, branchId);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: branchAction.DELETE_BRANCH_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: branchAction.DELETE_BRANCH_FAIL,
                value: ''
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
        } else {
            yield put({
                type: branchAction.DELETE_BRANCH_FAIL,
                value: errorMsg
            });
        }
    }
};


export const branchSaga = function* () {
    yield all([
        takeEvery(branchAction.GET_PAGGING_BRANCHES, getPaggingBranchesSage),
        takeEvery(branchAction.ADD_BRANCH, addBranchSaga),
        takeEvery(branchAction.ADD_BRANCH_SUCCESS, getPaggingBranchesSage),
        takeEvery(branchAction.DELETE_BRANCH, deleteBranchSaga),
        takeEvery(branchAction.DELETE_BRANCH_SUCCESS, getPaggingBranchesSage),
    ])
};