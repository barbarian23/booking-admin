import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { branchAction, userAction } from "../actions";
import { branchApi } from "../services/api";

const getPaggingServicesSage = function* (action) {
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


const addServiceSaga = function* (action) {
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


export const branchSaga = function* () {
    yield all([
        takeEvery(branchAction.GET_PAGGING_BRANCHES, getPaggingServicesSage),
        takeEvery(branchAction.ADD_BRANCH, addServiceSaga),
        takeEvery(branchAction.ADD_BRANCH_SUCCESS, getPaggingServicesSage),
    ])
};