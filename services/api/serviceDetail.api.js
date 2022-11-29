import Request from './api.request';
import { getLocalData } from '../localStorage';

class serviceDetailApi {
    add(name, price, time, description, colorCode, serviceId, turn, supply){
        return Request.post(`manager/business/service-detail`,
            {
                name : name,
                price : price,
                time : time,
                description : description,
                colorCode: colorCode,
                serviceId : serviceId,
                turn: turn,
                supply: supply,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    update(id, name, price, time, description, colorCode, serviceId, turn, supply){
        return Request.patch(`manager/business/service-detail/${id}`,
            {
                name: name,
                price: price,
                time: time,
                description: description,
                colorCode: colorCode,
                serviceId: serviceId,
                turn: turn,
                supply: supply,
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