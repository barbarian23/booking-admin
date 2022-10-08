import axios from 'axios';
import {API_URL, defaultHeader} from './api.config';

class Request{
    async callService(endpoint, method = 'GET', body = null, respData = true, header={}){
        let result = await axios({
                method: method,
                url: `${API_URL}/${endpoint}`,
                headers: {
                    ...defaultHeader,
                    ...header,
                },
                data: body
            });

        if(respData){
            //console.log(endpoint, result);
            return result;
        }else{
            return null;
        }
    }

    get(url, data=null, respData=true, header={}){
        return this.callService(url, 'GET', data, respData, header);
    }

    post(url, data=null, respData=true, header={}){
        return this.callService(url, 'POST', data, respData, header);
    }

    put(url, data=null, respData=true, header={}){
        return this.callService(url, 'PUT', data, respData, header);
    }

    push(url, data=null, respData=true, header={}){
        return this.callService(url, 'PUSH', data, respData, header);
    }

    delete(url, data=null, respData=true, header={}){
        return this.callService(url, 'DELETE', data, respData, header);
    }

}

export default new Request();