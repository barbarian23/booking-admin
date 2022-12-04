import { all, take, select } from "redux-saga/effects";

import { indexWatcher } from "./index.saga";
import { userSaga } from "./user.saga";

import { notificationSaga } from "./notification.saga";
import { serviceSaga } from "./service.saga";
import { branchSaga } from "./branch.saga";
import { staffSaga } from "./staff.saga";
import { storeSaga } from "./store.saga";
import { reportSaga } from "./report.saga";

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

    notificationSaga(),
    serviceSaga(),
    branchSaga(),
    staffSaga(),
    storeSaga(),
    reportSaga(),
  ]);
};

export default rootSaga;