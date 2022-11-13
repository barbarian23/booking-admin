const PREFIX = 'STORE/'

const storeAction = {
    //get all
    GET_PAGGING_STORES: PREFIX + 'GET_PAGGING_STORES',
    GET_PAGGING_STORES_SUCCESS: PREFIX + 'GET_PAGGING_STORES_SUCCESS',
    GET_PAGGING_STORES_FAIL: PREFIX + 'GET_PAGGING_STORES_FAIL',

    //change action
    CHANGE_ACTION: PREFIX + 'CHANGE_ACTION',

    //page change
    PAGE_CHANGE: PREFIX + 'PAGE_CHANGE',
    
    //add
    ADD_STORE: PREFIX + 'ADD_STORE',
    ADD_STORE_SUCCESS: PREFIX + 'ADD_STORE_SUCCESS',
    ADD_STORE_FAIL: PREFIX + 'ADD_STORE_FAIL',

    //add detail
    ADD_STORE_DETAIL: PREFIX + 'ADD_STORE_DETAIL',
    ADD_STORE_DETAIL_SUCCESS: PREFIX + 'ADD_STORE_DETAIL_SUCCESS',
    ADD_STORE_DETAIL_FAIL: PREFIX + 'ADD_STORE_DETAIL_FAIL',

    //delete
    DELETE_STORE: PREFIX + 'DELETE_STORE',
    DELETE_STORE_SUCCESS: PREFIX + 'DELETE_STORE_SUCCESS',
    DELETE_STORE_FAIL: PREFIX + 'DELETE_STORE_FAIL',

    SELECT_STORE: PREFIX + 'SELECT_STORE',
    
    //show add branch 
    SHOW_ADD_STORE_MODAL: PREFIX + 'SHOW_ADD_STORE_MODAL',
    HIDE_ADD_STORE_MODAL: PREFIX + 'HIDE_ADD_STORE_MODAL',

    //get combo branches
    GET_COMBO_BRANCHES: PREFIX + 'GET_COMBO_BRANCHES',
    GET_COMBO_BRANCHES_SUCCESS: PREFIX + 'GET_COMBO_BRANCHES_SUCCESS',
    GET_COMBO_BRANCHES_FAIL: PREFIX + 'GET_COMBO_BRANCHES_FAIL',

    //show detail branch 
    SHOW_DETAIL_STORE_MODAL: PREFIX + 'SHOW_DETAIL_STORE_MODAL',
    HIDE_DETAIL_STORE_MODAL: PREFIX + 'HIDE_DETAIL_STORE_MODAL',

    //show delete service 
    SHOW_DELETE_STORE_MODAL: PREFIX + 'SHOW_DELETE_STORE_MODAL',
    HIDE_DELETE_STORE_MODAL: PREFIX + 'HIDE_DELETE_STORE_MODAL',
}


export default storeAction;