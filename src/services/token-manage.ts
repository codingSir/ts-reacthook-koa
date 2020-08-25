import localStorage from './local-storge'
class Token {
    readonly key = 'token';

    /**
     * 获取 token
     */
    getToken(): string | object {
        return localStorage.getItem(this.key);
    }

    /**
     * 设置 token
     * @param token
     */
    setToken(token: any) {
        localStorage.setItem(this.key, token);
    }

    /**
     * 清理已存在的 token
     */
    clearToken() {
        localStorage.removeItem(this.key);
    }

    unlessToken(){
        return ['/login','/register']
    }
}

export const tokenMange = new Token();