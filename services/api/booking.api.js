import Request from './api.request';
import { getLocalData } from '../localStorage';

class bookingApi {
    getPagging(page = 1, pageSize = 1, customerName='', customerPhone='') {
        return Request.get(`manager/booking?pageNum=${page}&pageSize=${pageSize}&customerName=${customerName}&customerPhone=${customerPhone}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new bookingApi();