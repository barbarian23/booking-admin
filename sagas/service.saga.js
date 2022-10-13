import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { serviceAction, userAction } from "../actions";
import { serviceApi, branchApi } from "../services/api";

const getAllServicesSage = function* (action) {
    const service = yield select(state => state.service);
    const { page, pageSize } = service;
    try {
        let response = yield call(serviceApi.getAll, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.GET_ALL_SERVICES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: serviceAction.GET_ALL_SERVICES_FAIL,
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
                type: serviceAction.GET_ALL_SERVICES_FAIL,
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
                type: serviceAction.GET_COMBO_BRANCHES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: serviceAction.GET_COMBO_BRANCHES_FAIL,
                value: 'API error!'
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
        } else {
            yield put({
                type: serviceAction.GET_COMBO_BRANCHES_FAIL,
                value: errorMsg
            });
        }


    }
};

const addServiceSaga = function* (action) {
    const {branchID, serviceName} = action.value;
    try {
        let response = yield call(serviceApi.add, branchID, serviceName);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.ADD_SERVICE_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: serviceAction.ADD_SERVICE_FAIL,
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
                type: serviceAction.ADD_SERVICE_FAIL,
                value: errorMsg
            });
        }
    }
};


export const serviceSaga = function* () {
    yield all([
        takeEvery(serviceAction.GET_ALL_SERVICES, getAllServicesSage),
        takeEvery(serviceAction.GET_COMBO_BRANCHES, getComboBranchesSaga),
        takeEvery(serviceAction.ADD_SERVICE, addServiceSaga),
        takeEvery(serviceAction.ADD_SERVICE_SUCCESS, getAllServicesSage),
    ])
};