import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import { host } from './config'
import {message} from "antd";

import {
     serverResponseSuccessManager,
     serverResponseFailedManager
} from './server-response-manager'
import {tokenMange} from "@src/services/token-manage";


const axiosInstance:AxiosInstance = axios.create({
    baseURL: host,
    timeout: 50000
});

axiosInstance.interceptors.request.use(
    (config:AxiosRequestConfig):AxiosRequestConfig=>{

        if(!tokenMange.unlessToken().includes(config.url)){
            config.headers.authorization = tokenMange.getToken()['token'];
        }
        return config
    },
    (error:AxiosError) =>{
        message.error('请求错误');
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use((response:AxiosResponse):AxiosResponse => {
    serverResponseSuccessManager.codeParser(response);
    if(response.data.code === 200){
        return response.data.data;
    }
    return response;
},error => {

    serverResponseFailedManager.getErrorMessage(error);
    return Promise.reject(error)
});

export default axiosInstance