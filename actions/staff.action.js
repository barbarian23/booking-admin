const PREFIX = 'STAFF/'

const staffAction = {
    //get all
    GET_PAGGING_STAFFS: PREFIX + 'GET_PAGGING_STAFFS',
    GET_PAGGING_STAFFS_SUCCESS: PREFIX + 'GET_PAGGING_STAFFS_SUCCESS',
    GET_PAGGING_STAFFS_FAIL: PREFIX + 'GET_PAGGING_STAFFS_FAIL',

    //change action
    CHANGE_ACTION: PREFIX + 'CHANGE_ACTION',

    //page change
    PAGE_CHANGE: PREFIX + 'PAGE_CHANGE',
    
    //add
    ADD_STAFF: PREFIX + 'ADD_STAFF',
    ADD_STAFF_SUCCESS: PREFIX + 'ADD_STAFF_SUCCESS',
    ADD_STAFF_FAIL: PREFIX + 'ADD_STAFF_FAIL',

    //add detail
    ADD_STAFF_DETAIL: PREFIX + 'ADD_STAFF_DETAIL',
    ADD_STAFF_DETAIL_SUCCESS: PREFIX + 'ADD_STAFF_DETAIL_SUCCESS',
    ADD_STAFF_DETAIL_FAIL: PREFIX + 'ADD_STAFF_DETAIL_FAIL',

    //delete
    DELETE_STAFF: PREFIX + 'DELETE_STAFF',
    DELETE_STAFF_SUCCESS: PREFIX + 'DELETE_STAFF_SUCCESS',
    DELETE_STAFF_FAIL: PREFIX + 'DELETE_STAFF_FAIL',

    SELECT_STAFF: PREFIX + 'SELECT_STAFF',
    //show add branch 
    SHOW_ADD_STAFF_MODAL: PREFIX + 'SHOW_ADD_STAFF_MODAL',
    HIDE_ADD_STAFF_MODAL: PREFIX + 'HIDE_ADD_STAFF_MODAL',

    //get combo branches
    GET_COMBO_BRANCHES: PREFIX + 'GET_COMBO_BRANCHES',
    GET_COMBO_BRANCHES_SUCCESS: PREFIX + 'GET_COMBO_BRANCHES_SUCCESS',
    GET_COMBO_BRANCHES_FAIL: PREFIX + 'GET_COMBO_BRANCHES_FAIL',

    //get combo levels
    GET_COMBO_LEVELS: PREFIX + 'GET_COMBO_LEVELS',
    GET_COMBO_LEVELS_SUCCESS: PREFIX + 'GET_COMBO_LEVELS_SUCCESS',
    GET_COMBO_LEVELS_FAIL: PREFIX + 'GET_COMBO_LEVELS_FAIL',

    //show detail branch 
    SHOW_DETAIL_STAFF_MODAL: PREFIX + 'SHOW_DETAIL_STAFF_MODAL',
    HIDE_DETAIL_STAFF_MODAL: PREFIX + 'HIDE_DETAIL_STAFF_MODAL',

    //show delete service 
    SHOW_DELETE_STAFF_MODAL: PREFIX + 'SHOW_DELETE_STAFF_MODAL',
    HIDE_DELETE_STAFF_MODAL: PREFIX + 'HIDE_DELETE_STAFF_MODAL',
}


export default staffAction;