import Request from './api.request';
import { getLocalData } from '../localStorage';

class checkInApi {
    getPagging(page = 1, pageSize = 10) {
        return Request.get(`nail/manager/check-in/customer?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new checkInApi();