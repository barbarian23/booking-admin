const PREFIX = 'SERVICE/'

const serviceAction = {
    //get all
    GET_PAGGING_SERVICES: PREFIX + 'GET_PAGGING_SERVICES',
    GET_PAGGING_SERVICES_SUCCESS: PREFIX + 'GET_PAGGING_SERVICES_SUCCESS',
    GET_PAGGING_SERVICES_FAIL: PREFIX + 'GET_PAGGING_SERVICES_FAIL',

    //change action
    CHANGE_ACTION: PREFIX + 'CHANGE_ACTION',
    
    //add
    ADD_SERVICE: PREFIX + 'ADD_SERVICE',
    ADD_SERVICE_SUCCESS: PREFIX + 'ADD_SERVICE_SUCCESS',
    ADD_SERVICE_FAIL: PREFIX + 'ADD_SERVICE_FAIL',

    //delete
    DELETE_SERVICE: PREFIX + 'DELETE_SERVICE',
    DELETE_SERVICE_SUCCESS: PREFIX + 'DELETE_SERVICE_SUCCESS',
    DELETE_SERVICE_FAIL: PREFIX + 'DELETE_SERVICE_FAIL',

    SELECT_SERVICE: PREFIX + 'SELECT_SERVICE',
    //show add service 
    SHOW_ADD_SERVICE_MODAL: PREFIX + 'SHOW_ADD_SERVICE_MODAL',
    HIDE_ADD_SERVICE_MODAL: PREFIX + 'HIDE_ADD_SERVICE_MODAL',

    //get combo branches
    GET_COMBO_BRANCHES: PREFIX + 'GET_COMBO_BRANCHES',
    GET_COMBO_BRANCHES_SUCCESS: PREFIX + 'GET_COMBO_BRANCHES_SUCCESS',
    GET_COMBO_BRANCHES_FAIL: PREFIX + 'GET_COMBO_BRANCHES_FAIL',

    //show delet service 
    SHOW_DELETE_SERVICE_MODAL: PREFIX + 'SHOW_DELETE_SERVICE_MODAL',
    HIDE_DELETE_SERVICE_MODAL: PREFIX + 'HIDE_DELETE_SERVICE_MODAL',

    //show service details modal
    SHOW_SERVICE_DETAILS_MODAL: PREFIX + 'SHOW_SERVICE_DETAILS_MODAL',
    HIDE_SERVICE_DETAILS_MODAL: PREFIX + 'HIDE_SERVICE_DETAILS_MODAL',

    //show add service detail modal
    SHOW_ADD_SERVICE_DETAIL_MODAL: PREFIX + 'SHOW_ADD_SERVICE_DETAIL_MODAL',
    HIDE_ADD_SERVICE_DETAIL_MODAL: PREFIX + 'HIDE_ADD_SERVICE_DETAIL_MODAL',
  
    //add detail
    ADD_SERVICE_DETAIL: PREFIX + 'ADD_SERVICE_DETAIL',
    ADD_SERVICE_DETAIL_SUCCESS: PREFIX + 'ADD_SERVICE_DETAIL_SUCCESS',
    ADD_SERVICE_DETAIL_FAIL: PREFIX + 'ADD_SERVICE_DETAIL_FAIL',

    //show delete service detail modal
    SHOW_DELETE_SERVICE_DETAIL_MODAL: PREFIX + 'SHOW_DELETE_SERVICE_DETAIL_MODAL',
    HIDE_DELETE_SERVICE_DETAIL_MODAL: PREFIX + 'HIDE_DELETE_SERVICE_DETAIL_MODAL',

    //delete detail
    DELETE_SERVICE_DETAIL: PREFIX + 'DELETE_SERVICE_DETAIL',
    DELETE_SERVICE_DETAIL_SUCCESS: PREFIX + 'DELETE_SERVICE_DETAIL_SUCCESS',
    DELETE_SERVICE_DETAIL_FAIL: PREFIX + 'DELETE_SERVICE_DETAIL_FAIL',

}


export default serviceAction;