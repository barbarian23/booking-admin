import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { checkInAction, userAction, notificationAction } from "../actions";
import { checkInApi } from "../services/api";

const getPaggingStaffsSage = function* (action) {
    const checkIn = yield select(state => state.checkIn);
    const { page, pageSize } = checkIn;
    try {
        yield put({
            type: checkInAction.CHANGE_LOADING,
            value: true,
        });

        let response = yield call(checkInApi.getPagging, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS_FAIL,
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
                type: checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }

    yield put({
        type: checkInAction.CHANGE_LOADING,
        value: false,
    });
};

export const checkInSaga = function* () {
    yield all([
        takeEvery(checkInAction.GET_PAGGING_CHECK_IN_CUSTOMERS, getPaggingStaffsSage),
        takeEvery(checkInAction.PAGE_CHANGE, getPaggingStaffsSage),
    ])
};