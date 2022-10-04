import { combineReducers } from "redux";

import leftMenuReducer from "./leftmenu.reducer";
import userReducer from "./user.reducer";


export default combineReducers({
    leftMenu: leftMenuReducer,
    user: userReducer,
});