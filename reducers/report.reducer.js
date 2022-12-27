import { date2ISODateStr } from '../services/utils/time';
import { reportAction } from '../actions';

const initState = {
    reports: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    isLoading: false,

    employeeName: '',
    fromDate: date2ISODateStr(new Date()),
    toDate: date2ISODateStr(new Date()),
}

const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case reportAction.CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.value,
            }
        case reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT_SUCCESS:
            return {
                ...state,
                reports: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case reportAction.GET_PAGING_RATE_EMPLOYEE_REPORT_FAIL:
            return {
                ...state,
                reportes: [],
            }
        case reportAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        case reportAction.EMPLOYEE_NAME_CHANGE:
            return {
                ...state,
                employeeName: action.value,
            }
        case reportAction.FROM_DATE_CHANGE:
            return {
                ...state,
                fromDate: action.value,
            }
        case reportAction.TO_DATE_CHANGE:
            return {
                ...state,
                toDate: action.value,
            }

        default:
            return state;
    }
}

export default reportReducer;