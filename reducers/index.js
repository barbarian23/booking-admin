import { combineReducers } from "redux";

import leftMenuReducer from "./leftmenu.reducer";
import userReducer from "./user.reducer";
import serviceReducer from "./service.reducer";
import branchReducer from "./branch.reducer";

export default combineReducers({
    leftMenu: leftMenuReducer,
    user: userReducer,
    service: serviceReducer,
    branch: branchReducer,
});