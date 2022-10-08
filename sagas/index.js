import { all, take, select } from "redux-saga/effects";

import { indexWatcher } from "./index.saga";
import { userSaga } from "./user.saga";

import { serviceSaga } from "./service.saga";

//quan sát toàn bộ các action
const watchAndLog = function* () {
  while (true) {
    const action = yield take("*");
    const state = yield select();
    //console.log('action', action);
  }
};

const rootSaga = function* () {
  yield all([
    watchAndLog(),
    indexWatcher(),
    userSaga(),

    serviceSaga(),
  ]);
};

export default rootSaga;