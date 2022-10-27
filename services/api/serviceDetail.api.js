import Request from './api.request';
import { getLocalData } from '../localStorage';

class serviceDetailApi {
    add(name, price, time, description, serviceId, turn){
        return Request.post(`manager/business/service-detail`,
            {
                name : name,
                price : price,
                time : time,
                description : description,
                serviceId : serviceId,
                turn: turn,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    delete(serviceDetailId){
        return Request.delete(`manager/business/service-detail/${serviceDetailId}`,
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }
}

export default new serviceDetailApi();