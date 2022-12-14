import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { reportAction, userAction, notificationAction } from "../actions";
import { reportApi } from "../services/api";

const getPaggingRateEmployeeReportSage = function* (action) {
    const report = yield select(state => state.report);
    const { fromDate, toDate, employeeName, page, pageSize } = report;
    try {
        yield put({
            type: reportAction.CHANGE_LOADING,
            value: true,
        });

        let response = yield call(reportApi.getPagingRateEmployeeReport, fromDate, toDate, employeeName, page, pageSize);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);
            yield put({
                type: reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT_SUCCESS,
                value: data.data,
            });
        } else {
            yield put({
                type: reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT_FAIL,
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
                type: reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT_FAIL,
                value: errorMsg
            });
            yield put({
                type: notificationAction.ERROR,
                value: errorMsg,
            });
        }
    }

    yield put({
        type: reportAction.CHANGE_LOADING,
        value: false,
    });
};

export const reportSaga = function* () {
    yield all([
        takeEvery(reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT, getPaggingRateEmployeeReportSage),
        takeEvery(reportAction.PAGE_CHANGE, getPaggingRateEmployeeReportSage),
    ])
};