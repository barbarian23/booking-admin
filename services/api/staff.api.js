import Request from './api.request';
import { getLocalData } from '../localStorage';

class employeeApi {
    getPagging(page = 1, pageSize = 10) {
        return Request.get(`nail/manager/employee?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate){
        return Request.post(`nail/manager/employee`,
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

    update(id, fullName, idCard, phone, dob, address, branchId, level, passCode, rate){
        return Request.patch(`nail/manager/employee/${id}`,
            {
                fullName : fullName,
                idCard : idCard,
                phone : phone,
                dob : dob,
                address : address, 
                branchId : branchId,
                level : level,
                passCode : passCode,
                rate: rate,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    delete(staffId){
        return Request.delete(`nail/manager/employee/${staffId}`,
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }

    
    getComboLevels(){
        return Request.get(`nail/common/combobox/level`, 
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }
}

export default new employeeApi();