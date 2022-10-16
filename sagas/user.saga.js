import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { userAction, notificationAction } from "../actions";
import userApi from "../services/api/user.api";

const loginSaga = function* (action) {
    const { username, password } = action.value;
    const user = yield select(state => state.user);
    try {
        let response = yield call(userApi.login, username, password, user.grantType, user.scope);
        if (response.status === 200) {
            let data = response.data;
            console.log('login success!');
            yield put({
                type: userAction.LOG_IN_SUCCESS,
                value: data,
            });
            yield put({
                type: notificationAction.SUCCESS,
                value: 'notification.login_success',
            });
        } else {
            yield put({
                type: userAction.LOG_IN_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: 'Incorrect username or password!',
            });
        }

    } catch (error) {
        console.log(error);
        yield put({
            type: userAction.LOG_IN_FAIL,
            value: ''
        });
        yield put({
            type: notificationAction.ERROR,
            value: error,
        });
    }
};

export const userSaga = function* () {
    yield all([
        takeEvery(userAction.LOG_IN, loginSaga),
    ]);
};