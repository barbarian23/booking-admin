import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { serviceAction, userAction, notificationAction } from "../actions";
import { serviceApi, serviceDetailApi, branchApi } from "../services/api";

const getPaggingServicesSage = function* (action) {
    const service = yield select(state => state.service);
    const { page, pageSize } = service;
    try {
        let response = yield call(serviceApi.getPagging, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.GET_PAGGING_SERVICES_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: serviceAction.GET_PAGGING_SERVICES_FAIL,
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
                type: serviceAction.GET_PAGGING_SERVICES_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
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
                type: serviceAction.GET_COMBO_BRANCHES_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }


    }
};

const addServiceSaga = function* (action) {
    const { branchID, serviceName } = action.value;
    try {
        let response = yield call(serviceApi.add, branchID, serviceName);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.ADD_SERVICE_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.adding_success"
            });
        } else {
            yield put({
                type: serviceAction.ADD_SERVICE_FAIL,
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
                type: serviceAction.ADD_SERVICE_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

const deleteServiceSaga = function* (action) {
    const { serviceId } = action.value;
    try {
        let response = yield call(serviceApi.delete, serviceId);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.DELETE_SERVICE_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.deleting_success"
            });
        } else {
            yield put({
                type: serviceAction.DELETE_SERVICE_FAIL,
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
                type: serviceAction.DELETE_SERVICE_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

const addServiceDetailSaga = function* (action) {
    const { name, price, time, description, serviceId, turn, supply } = action.value;
    try {
        let response = yield call(serviceDetailApi.add, name, price, time, description, serviceId, turn, supply);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.ADD_SERVICE_DETAIL_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.adding_success"
            });
        } else {
            yield put({
                type: serviceAction.ADD_SERVICE_DETAIL_FAIL,
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
                type: serviceAction.ADD_SERVICE_DETAIL_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

const deleteServiceDetailSaga = function* (action) {
    const { serviceDetailId } = action.value;
    try {
        let response = yield call(serviceDetailApi.delete, serviceDetailId);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: serviceAction.DELETE_SERVICE_DETAIL_SUCCESS,
                value: data.data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: "notification.deleting_success"
            });
        } else {
            yield put({
                type: serviceAction.DELETE_SERVICE_DETAIL_FAIL,
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
                type: serviceAction.DELETE_SERVICE_DETAIL_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }
};

export const serviceSaga = function* () {
    yield all([
        takeEvery(serviceAction.GET_PAGGING_SERVICES, getPaggingServicesSage),
        takeEvery(serviceAction.PAGE_CHANGE, getPaggingServicesSage),
        takeEvery(serviceAction.GET_COMBO_BRANCHES, getComboBranchesSaga),
        takeEvery(serviceAction.ADD_SERVICE, addServiceSaga),
        takeEvery(serviceAction.ADD_SERVICE_SUCCESS, getPaggingServicesSage),
        takeEvery(serviceAction.ADD_SERVICE_DETAIL, addServiceDetailSaga),
        takeEvery(serviceAction.ADD_SERVICE_DETAIL_SUCCESS, getPaggingServicesSage),
        takeEvery(serviceAction.DELETE_SERVICE, deleteServiceSaga),
        takeEvery(serviceAction.DELETE_SERVICE_SUCCESS, getPaggingServicesSage),
        takeEvery(serviceAction.DELETE_SERVICE_DETAIL, deleteServiceDetailSaga),
        takeEvery(serviceAction.DELETE_SERVICE_DETAIL_SUCCESS, getPaggingServicesSage),
    ])
};