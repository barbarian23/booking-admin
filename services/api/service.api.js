import Request from './api.request';
import { getLocalData } from '../localStorage';

class serviceApi {
    getPagging(page = 1, pageSize = 10) {
        return Request.get(`nail/manager/business/service?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(branch_id, name){
        return Request.post(`nail/manager/business/service`,
            {
                branch_id: branch_id,
                name: name,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    update(service_id, branch_id, name){
        return Request.patch(`nail/manager/business/service/${service_id}`,
            {
                branch_id: branch_id,
                name: name,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    delete(serviceId){
        return Request.delete(`nail/manager/business/service/${serviceId}`,
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }
}

export default new serviceApi();