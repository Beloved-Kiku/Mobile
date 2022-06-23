//此处为请求统一管理文件
//导入封装好的axios
import axiosHttp from '@/request/request'
//引入Token
import { getToken } from "@/utils/token";
//用户推荐导航
export const Api = () => {
        return axiosHttp({
            //获取列表 若用户登录 则携带token 发送请求 没有则返回默认值
            url: '/v1_0/user/channels',
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
    //获取所有的推荐
export const AllTab = () => {
        return axiosHttp({
            url: '/v1_0/channels',
            method: 'GET'
        })
    }
    //请求登录
export const LoginApi = ({ mobile, code }) => {
        return axiosHttp({
            url: '/v1_0/authorizations',
            method: 'POST',
            data: {
                mobile,
                code
            }
        })
    }
    //请求推荐内容
export const ArtListApi = ({ channel_id, timestamp }) => {
        return axiosHttp({
            url: '/v1_0/articles',
            method: 'GET',
            //后台需要在链接中传递参数 所以  使用params
            params: {
                channel_id,
                timestamp
            },
        })
    }
    //文章 不喜欢 
export const ArtDisLikeApi = ({ target }) => {
    return axiosHttp({
        url: '/v1_0/article/dislikes',
        method: "POST",
        data: {
            target
        },
    })
}