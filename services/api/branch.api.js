import Request from './api.request';
import { getLocalData } from '../localStorage';
// import { BRANCH_CODE, TENANT } from './api.config';

class branchApi {
    getComboData() {
        return Request.get(`nail/common/combobox/branch`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    getPagging(page = 1, pageSize = 10) {
        return Request.get(`nail/manager/branch/all?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(name, address, hotLine, description) {
        return Request.post(`nail/manager/branch`,
            {
                name: name,
                address: address,
                hotLine: hotLine,
                description: description
            },
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    delete(branchId){
        return Request.delete(`nail/manager/branch/${branchId}`,
        {},
        true,
        {
            'Authorization': `Bearer ${getLocalData('access_token')}`,
        });
    }

}

export default new branchApi();