import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { storeAction, userAction, notificationAction } from "../actions";
import { storeApi, branchApi } from "../services/api";

const getPaggingStaffsSage = function* (action) {
    const store = yield select(state => state.store);
    const { page, pageSize } = store;
    try {
        yield put({
            type: storeAction.CHANGE_LOADING,
            value: true,
        });

        let response = yield call(storeApi.getPagging, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: storeAction.GET_PAGGING_STORES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: storeAction.GET_PAGGING_STORES_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (err) {
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
                type: storeAction.GET_PAGGING_STORES_FAIL,
                value: errorMsg
            });
        }
    }

    yield put({
        type: storeAction.CHANGE_LOADING,
        value: false,
    });
};

const getComboBranchesSaga = function* (action) {
    try {
        let response = yield call(branchApi.getComboData);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: storeAction.GET_COMBO_BRANCHES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: storeAction.GET_COMBO_BRANCHES_FAIL,
                value: 'API error!'
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        console.log(errorMsg);
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.session_is_expired"
            });
        } else {
            yield put({
                type: storeAction.GET_COMBO_BRANCHES_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }


    }
};

const addStaffSaga = function* (action) {
    const { fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate } = action.value;
    try {
        let response = yield call(storeApi.add, fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate);
        if (response.status === 200) {
            let data = response.data;
            // console.log(data);
            yield put({
                type: storeAction.ADD_STORE_SUCCESS,
                value: data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.adding_success"
            });
        } else {
            yield put({
                type: storeAction.ADD_STORE_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.adding_fail"
            });
        }
    } catch (err) {
        const errorMsg = err.response?.data?.error;
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
                type: storeAction.ADD_STORE_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

export const storeSaga = function* () {
    yield all([
        takeEvery(storeAction.GET_PAGGING_STORES, getPaggingStaffsSage),
        takeEvery(storeAction.PAGE_CHANGE, getPaggingStaffsSage),
        takeEvery(storeAction.GET_COMBO_BRANCHES, getComboBranchesSaga),
        takeEvery(storeAction.ADD_STORE, addStaffSaga),
        takeEvery(storeAction.ADD_STORE_SUCCESS, getPaggingStaffsSage),
    ])
};