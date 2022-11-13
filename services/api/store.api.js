import Request from './api.request';
import { getLocalData } from '../localStorage';

class storeApi {
    getPagging(page = 1, pageSize = 10) {
        return Request.get(`admin/store?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate){
        return Request.post(`admin/store`,
            {
                fullName : fullName,
                idCard : idCard,
                phone : phone,
                dob : dob,
                address : address, 
                branchId : branchId,
                isManager : isManager,
                level : level,
                passCode : passCode,
                rate: rate,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new storeApi();