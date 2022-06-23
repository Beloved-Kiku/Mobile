//axios二次封装
import axios from 'axios'
import router from '@/router';
import { Notify } from 'vant';
import { getToken } from '@/utils/token'
const axiosHttp = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
});
// 添加请求拦截器
axiosHttp.interceptors.request.use(function(config) {
        if (config.headers.Authorization === undefined) {
            config.headers.Authorization = `Bearer ${getToken()}`
        }
        // 在发送请求之前做些什么
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
axiosHttp.interceptors.response.use(function(response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //用户token 失效 自动 跳转到Login  重新登陆
    if (error.response.status === 401) {
        Notify({ type: 'warning', message: '身份过期,请重新登录' })
        router.push('/Login')
    }

    return Promise.reject(error);
});
//对外导出时候 包裹一层 请求数据过滤体

export default ({ url, method = 'GET', data = {}, params = {}, headers = {} }) => {
    //aixos 请求会在原地返回一个Promise 对象 需要返回出去
    return axiosHttp({
        url,
        method,
        data,
        params,
        headers
    })
}