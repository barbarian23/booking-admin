import { all, put, call, select, takeEvery } from "redux-saga/effects";
import { userAction } from "../actions";
import userApi from "../services/api/user.api";

const loginSaga = function* (action) {
    const { username, password } = action.value;
    const user = yield select(state => state.user);
    try {
        let response = yield call(userApi.login, username, password, user.grant_type, user.scope);
        if (response.status === 200) {
            let data = response.data;
            console.log(data);

            console.log('login success!');
            // yield put(alertActions.success('Đăng nhập thành công !'));

            // history.push(Path.HOME);
        } else {
            // console.log('username and password wrong');
            // yield put(alertActions.error('Tên đăng nhập hoặc mật khâu không chính xác!'));
            // yield put(actions.loginFailure());
        }

    } catch (error) {
        console.log(error);
        yield put({
            type: userAction.LOG_IN_FAIL,
            value: ''
        });
    }
};

export const userSaga = function* () {
    yield all([
        takeEvery(userAction.LOG_IN, loginSaga),
    ]);
};