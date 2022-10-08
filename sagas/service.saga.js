import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { serviceAction, userAction } from "../actions";
import serviceApi from "../services/api/service.api";

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
        console.log(err.response.data)
        if (errorMsg == 'invalid_token'){
            console.log(errorMsg)
            yield put({
                type: userAction.LOG_OUT,
                value: ''
            });
        }else{
            yield put({
                type: serviceAction.GET_ALL_SERVICES_FAIL,
                value: ''
            });
        }
        

    }
};

export const serviceSaga = function* () {
    yield all([
        takeEvery(serviceAction.GET_ALL_SERVICES, getAllServicesSage),
    ]);
};