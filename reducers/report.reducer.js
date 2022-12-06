import { date2dStr } from '../services/utils/time'; 
import { reportAction } from '../actions';

const initState = {
    reports: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,

    fromDate: date2dStr(new Date()),
    toDate: date2dStr(new Date()),
    branchCode: '10e0633b-9f1c-438e-95e8-a86a7a2499fc',
}

const reportReducer = (state = initState, action) => {
    switch (action.type) {
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