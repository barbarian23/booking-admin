import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { staffAction, userAction } from "../actions";
import { staffApi } from "../services/api";

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
        }
    } catch (err) {
        const errorMsg = err.response.data.error;
        if (errorMsg == 'invalid_token') {
            yield put({
                type: userAction.LOG_OUT,
            });
        } else {
            yield put({
                type: staffAction.GET_PAGGING_STAFFS_FAIL,
                value: errorMsg
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
        } else {
            yield put({
                type: staffAction.ADD_STAFF_FAIL,
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
                type: staffAction.ADD_STAFF_FAIL,
                value: errorMsg
            });
        }
    }
};


export const staffSaga = function* () {
    yield all([
        takeEvery(staffAction.GET_PAGGING_STAFFS, getPaggingStaffsSage),
        takeEvery(staffAction.ADD_STAFF, addStaffSaga),
        takeEvery(staffAction.ADD_STAFF_SUCCESS, getPaggingStaffsSage),
    ])
};