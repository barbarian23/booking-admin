import Request from './api.request';
import { getLocalData } from '../localStorage';

class employeeApi {
    getAll(page = 1, pageSize = 10) {
        return Request.get(`manager/employee?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(fullName, idCard, phone, dob, address, branchId, isManager, level, passCode){
        return Request.post(`manager/employee`,
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
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }
}

export default new employeeApi();