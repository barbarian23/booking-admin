import Request from './api.request';
import { getLocalData } from '../localStorage';

class reportApi {
    getPagingRateEmployeeReport(branchCode, fromDate, toDate, page = 1, pageSize = 10) {
        return Request.get(`manager/report?branchCode=${branchCode}&dateFrom=${fromDate}&dateTo=${toDate}&employeeName&pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new reportApi();