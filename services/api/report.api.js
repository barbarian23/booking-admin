import Request from './api.request';
import { getLocalData } from '../localStorage';
import { BRANCH_CODE, TENANT } from './api.config';

class reportApi {
    getPagingRateEmployeeReport(fromDate, toDate, employeeName, page = 1, pageSize = 10) {
        return Request.get(`manager/report?branchCode=${BRANCH_CODE}&tenant=${TENANT}&dateFrom=${fromDate}&dateTo=${toDate}&employeeName=${employeeName}&pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new reportApi();