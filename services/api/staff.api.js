import Request from './api.request';
import { getLocalData } from '../localStorage';

class employeeApi {
    getPagging(page = 1, pageSize = 10) {
        return Request.get(`manager/employee?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(fullName, idCard, phone, dob, address, branchId, isManager, level, passCode, rate){
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
                rate: rate,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    update(id, fullName, idCard, phone, dob, address, passCode, rate){
        return Request.patch(`manager/business/employee/${id}`,
            {
                fullName : fullName,
                idCard : idCard,
                phone : phone,
                dob : dob,
                address : address, 
                passCode : passCode,
                rate: rate,
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    delete(staffId){
        return Request.delete(`manager/employee/${staffId}`,
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }

    
    getComboLevels(){
        return Request.get(`common/combobox/level`, 
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }
}

export default new employeeApi();