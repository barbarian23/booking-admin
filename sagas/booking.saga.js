import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { bookingAction, userAction, notificationAction } from "../actions";
import { bookingApi } from "../services/api";

const getPaggingStaffsSage = function* (action) {
    const booking = yield select(state => state.booking);
    const { page, pageSize, customerName, customerPhone } = booking;
    try {
        yield put({
            type: bookingAction.CHANGE_LOADING,
            value: true,
        });

        let response = yield call(bookingApi.getPagging, page, pageSize, customerName, customerPhone);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: bookingAction.GET_PAGGING_BOOKINGS_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: bookingAction.GET_PAGGING_BOOKINGS_FAIL,
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
                type: bookingAction.GET_PAGGING_BOOKINGS_FAIL,
                value: errorMsg
            });
        }
    }

    yield put({
        type: bookingAction.CHANGE_LOADING,
        value: false,
    });
};

export const bookingSaga = function* () {
    yield all([
        takeEvery(bookingAction.GET_PAGGING_BOOKINGS, getPaggingStaffsSage),
        takeEvery(bookingAction.PAGE_CHANGE, getPaggingStaffsSage),
    ])
};