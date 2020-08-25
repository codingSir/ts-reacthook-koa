import axios from '@src/services/axios'

export const login = (params) => axios.post('/login',params);

export const register = (params) => axios.post('/register',params);