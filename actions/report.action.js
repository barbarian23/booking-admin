const PREFIX = 'REPORT/'

const reportAction = {
    //get report rate employee
    GET_PAGING_RATE_EMPLOYEE_REPORT: PREFIX + 'GET_PAGING_RATE_EMPLOYEE_REPORT',
    GET_PAGING_RATE_EMPLOYEE_REPORT_SUCCESS: PREFIX + 'GET_PAGING_RATE_EMPLOYEE_REPORT_SUCCESS',
    GET_PAGING_RATE_EMPLOYEE_REPORT_FAIL: PREFIX + 'GET_PAGING_RATE_EMPLOYEE_REPORT_FAIL',

    //page change
    PAGE_CHANGE: PREFIX + 'PAGE_CHANGE',

    //from date change
    FROM_DATE_CHANGE: PREFIX + 'FROM_DATE_CHANGE',
    TO_DATE_CHANGE: PREFIX + 'TO_DATE_CHANGE',
}

export default reportAction;