import { combineReducers } from "redux";

import leftMenuReducer from "./leftmenu.reducer";
import userReducer from "./user.reducer";
import serviceReducer from "./service.reducer";
import branchReducer from "./branch.reducer";
import staffReducer from "./staff.reducer";
import storeReducer from "./store.reducer";
import reportReducer from "./report.reducer";
import bookingReducer from "./booking.reducer";
import checkInReducer from "./checkIn.reducer";

export default combineReducers({
    leftMenu: leftMenuReducer,
    user: userReducer,
    service: serviceReducer,
    branch: branchReducer,
    staff: staffReducer,
    store: storeReducer,
    report: reportReducer,
    booking: bookingReducer,
    checkIn: checkInReducer,
});