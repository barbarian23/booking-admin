import { combineReducers } from "redux";

import leftMenuReducer from "./leftmenu.reducer";

export default combineReducers({
    leftMenu: leftMenuReducer
});