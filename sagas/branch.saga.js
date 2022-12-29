import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { branchAction, userAction, notificationAction } from "../actions";
import { branchApi } from "../services/api";

const getPaggingBranchesSage = function* (action) {
    const branch = yield select(state => state.branch);
    const { page, pageSize } = branch;
    try {
        yield put({
            type: branchAction.CHANGE_LOADING,
            value: true,
        });

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
            yield put({
                type: notificationAction.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (err) {
        // const errorMsg = err.response.data.error;
        // if (errorMsg == 'invalid_token') {
        const code = err.response.status;
        if (code == 401) {
            yield put({
                type: userAction.LOG_OUT,
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.session_is_expired"
            });
        } else {
            const errorMsg = err.response.data.error;
            yield put({
                type: branchAction.GET_PAGGING_BRANCHES_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
    yield put({
        type: branchAction.CHANGE_LOADING,
        value: false,
    });
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
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.adding_success"
            });
        } else {
            yield put({
                type: branchAction.ADD_BRANCH_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.adding_fail"
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.session_is_expired"
            });
        } else {
            yield put({
                type: branchAction.ADD_BRANCH_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
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
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.deleting_success"
            });
        } else {
            yield put({
                type: branchAction.DELETE_BRANCH_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.deleting_fail"
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.session_is_expired"
            });
        } else {
            yield put({
                type: branchAction.DELETE_BRANCH_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};


export const branchSaga = function* () {
    yield all([
        takeEvery(branchAction.GET_PAGGING_BRANCHES, getPaggingBranchesSage),
        takeEvery(branchAction.PAGE_CHANGE, getPaggingBranchesSage),
        takeEvery(branchAction.ADD_BRANCH, addBranchSaga),
        takeEvery(branchAction.ADD_BRANCH_SUCCESS, getPaggingBranchesSage),
        takeEvery(branchAction.DELETE_BRANCH, deleteBranchSaga),
        takeEvery(branchAction.DELETE_BRANCH_SUCCESS, getPaggingBranchesSage),
    ])
};