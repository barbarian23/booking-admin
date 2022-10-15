import Request from './api.request';
import { getLocalData } from '../localStorage';

class branchApi {
    getComboData() {
        return Request.get(`common/combobox/branch`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    getPagging(page = 1, pageSize = 10) {
        return Request.get(`manager/branch/all?pageNum=${page}&pageSize=${pageSize}`,
            {},
            true,
            {
                'Authorization': `Bearer ${getLocalData('access_token')}`,
            });
    }

    add(name, address, hotLine, description) {
        return Request.post(`manager/branch`,
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

}

export default new branchApi();