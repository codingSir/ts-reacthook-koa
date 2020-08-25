import axios, { AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';


/**
 * 针对请求成功：返回的 code 码做不同的响应处理
 */
class ServerResponseSuccessManager {
    /**
     * 状态码解析器
     * @param response
     */
    codeParser(response: AxiosResponse) {
        console.log(response)
        const code = response?.data?.code;
        const resData = response?.data?.data;
        const parser = {
            '10010': () => {
                this.handleCodeIs10010(resData);
            },
            '200':()=>{
                message.info(response?.data?.msg)
            },
            default: () => console.log('code 无法识别'),
        };
        return parser[code] ? parser[code]() : parser['default'];
    }

    /**
     * 状态码为 10010 的响应处理
     * @param resData
     */
    handleCodeIs10010(resData) {
        if (resData === 'TOKEN_INVALID') {
            message.config({
                maxCount: 1,
            });
            message.info('登录已过期，请重新登录');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }
    }
}

/**
 * 针对请求失败的响应处理
 */
class ServerResponseFailedManager {
    /**
     * 请求失败时，需要提示的信息
     */
    getErrorMessage(error: AxiosError) {
        console.log('buhuo')
        message.info(error.response || error.message);
    }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();
