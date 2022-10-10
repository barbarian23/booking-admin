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

}

export default new branchApi();