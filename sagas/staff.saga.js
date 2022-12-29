import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { staffAction, userAction, notificationAction } from "../actions";
import { staffApi, branchApi } from "../services/api";

const getPaggingStaffsSage = function* (action) {
    const staff = yield select(state => state.staff);
    const { page, pageSize } = staff;
    try {
        yield put({
            type: staffAction.CHANGE_LOADING,
            value: true,
        });

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
                type: staffAction.GET_PAGGING_STAFFS_FAIL,
                value: errorMsg
            });
        }
    }

    yield put({
        type: staffAction.CHANGE_LOADING,
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

const getComboLevelsSaga = function* (action) {
    try {
        let response = yield call(staffApi.getComboLevels);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.GET_COMBO_LEVELS_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: staffAction.GET_COMBO_LEVELS_FAIL,
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
                type: staffAction.GET_COMBO_LEVELS_FAIL,
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
        let response = yield call(staffApi.add, fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate);
        if (response.status === 200) {
            let data = response.data;
            // console.log(data);
            yield put({
                type: staffAction.ADD_STAFF_SUCCESS,
                value: data,
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

const updateStaffSaga = function* (action) {
    const { id, fullName, idCard, phone, dob, address, branchId, level, passCode, rate } = action.value;
    try {
        let response = yield call(staffApi.update, id, fullName, idCard, phone, dob, address, branchId, level, passCode, rate);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: staffAction.UPDATE_STAFF_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.updating_success"
            });
        } else {
            yield put({
                type: staffAction.UPDATE_STAFF_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.updating_fail"
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
                type: staffAction.UPDATE_STAFF_FAIL,
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
            // console.log(data);
            yield put({
                type: staffAction.DELETE_STAFF_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.deleting_success"
            });
        } else {
            yield put({
                type: staffAction.DELETE_STAFF_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.deleting_fail"
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
        takeEvery(staffAction.PAGE_CHANGE, getPaggingStaffsSage),
        takeEvery(staffAction.GET_COMBO_BRANCHES, getComboBranchesSaga),
        takeEvery(staffAction.GET_COMBO_LEVELS, getComboLevelsSaga),
        takeEvery(staffAction.ADD_STAFF, addStaffSaga),
        takeEvery(staffAction.ADD_STAFF_SUCCESS, getPaggingStaffsSage),
        takeEvery(staffAction.UPDATE_STAFF, updateStaffSaga),
        takeEvery(staffAction.UPDATE_STAFF_SUCCESS, getPaggingStaffsSage),
        takeEvery(staffAction.DELETE_STAFF, deleteStaffSaga),
        takeEvery(staffAction.DELETE_STAFF_SUCCESS, getPaggingStaffsSage),
    ])
};