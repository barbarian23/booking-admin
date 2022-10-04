import Request from './api.request';

class userApi {
    login(username = '', password = '', grant_type = '', scope = '') {
        return Request.post(`user/login`, {
            username: username,
            grant_type: grant_type,
            password: password,
            scope: scope
        }, 
        true, 
        {
            'Authorization': 'Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=',
            'login-type': 'jwt'
        });
    }

}

export default new userApi();