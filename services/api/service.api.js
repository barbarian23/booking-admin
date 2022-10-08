import Request from './api.request';
import { getLocalData } from '../localStorage';

class serviceApi {
    getAll(page = 1, pageSize = 10) {
        return Request.get(`manager/business/service?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

}

export default new serviceApi();