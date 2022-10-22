import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { staffAction, userAction } from "../actions";
import { staffApi, branchApi } from "../services/api";

const getPaggingStaffsSage = function* (action) {
    const staff = yield select(state => state.staff);
    const { page, pageSize } = staff;
    try {
        let response = yield call(staffApi.getPagging, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.GET_PAGGING_STAFFS_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: staffAction.GET_PAGGING_STAFFS_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.api_error",
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
                type: staffAction.GET_PAGGING_STAFFS_FAIL,
                value: errorMsg
            });
        }
    }
};

const getComboBranchesSaga = function* (action) {
    try {
        let response = yield call(branchApi.getComboData);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.GET_COMBO_BRANCHES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: staffAction.GET_COMBO_BRANCHES_FAIL,
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
                type: staffAction.GET_COMBO_BRANCHES_FAIL,
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
    const { fullName, idCard, phone, dob, address, branchId, isManager, level, passCode } = action.value;
    try {
        let response = yield call(staffApi.add, fullName, idCard, phone, dob, address, branchId, isManager, level, passCode);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.ADD_STAFF_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.adding_success"
            });
        } else {
            yield put({
                type: staffAction.ADD_STAFF_FAIL,
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
                type: staffAction.ADD_STAFF_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

const deleteStaffSaga = function* (action) {
    const { staffId } = action.value;
    try {
        let response = yield call(staffApi.delete, staffId);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.DELETE_STAFF_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: staffAction.DELETE_STAFF_FAIL,
                value: ''
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
                type: staffAction.DELETE_STAFF_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};


export const staffSaga = function* () {
    yield all([
        takeEvery(staffAction.GET_PAGGING_STAFFS, getPaggingStaffsSage),
        takeEvery(staffAction.GET_COMBO_BRANCHES, getComboBranchesSaga),
        takeEvery(staffAction.ADD_STAFF, addStaffSaga),
        takeEvery(staffAction.ADD_STAFF_SUCCESS, getPaggingStaffsSage),
        takeEvery(staffAction.DELETE_STAFF, deleteStaffSaga),
        takeEvery(staffAction.DELETE_STAFF_SUCCESS, getPaggingStaffsSage),
    ])
};