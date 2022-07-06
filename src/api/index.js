//此处为请求统一管理文件
//导入封装好的axios
import
axiosHttp from '@/request/request'
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
    //用户删除指定Tab内容
export const DeleteApi = ({ target }) => {
        return axiosHttp({
            url: `/v1_0/user/channels/${target}`,
            method: 'DELETE'
        })
    }
    //搜索联想界面补全
export const SearchValue = ({ q }) => {
        return axiosHttp({
            url: '/v1_0/suggestion',
            method: 'GET',
            params: {
                q
            }
        })

    }
    //搜索结果
export const SearchIndex = ({ page, per_page, q }) => {
        return axiosHttp({
            url: '/v1_0/search',
            method: 'GET',
            params: {
                page,
                per_page,
                q
            }
        })
    }
    //获取文章详情
export const ArtAllMessage = ({ article_id }) => {
        return axiosHttp({
            url: `/v1_0/articles/${article_id}`,
            method: 'GET'
        })
    }
    //对文字点赞
export const GoodArt = ({ target }) => {
        return axiosHttp({
            url: '/v1_0/article/likings',
            method: 'POST',
            data: {
                target
            }
        })
    }
    //收藏文章
export const collect = ({ target }) => {
        return axiosHttp({
            url: '/v1_0/article/collections',
            method: 'POST',
            data: {
                target
            }
        })
    }
    //关注用户
export const focus = ({ target }) => {
        return axiosHttp({
            url: '/v1_0/user/followings',
            method: 'POST',
            data: {
                target
            }
        })
    }
    //获取评论信息
export const CommentValue = ({ source }) => {
        return axiosHttp({
            url: '/v1_0/comments',
            method: "GET",
            params: {
                type: 'a',
                source,
                limit: 10
            }
        })
    }
    //获取用户基本信息
export const UserInfo = () => {
        return axiosHttp({
            url: '/v1_0/user',
            method: 'GET'
        })
    }
    //获取用户默认个人资料
export const defaultMsg = () => {
        return axiosHttp({
            url: '/v1_0/user/profile',
            method: 'GET'
        })
    }
    //用户修改头像接口
export const ChangeHeadPic = (fd) => {
        return axiosHttp({
            //axios 如果数据以为data{}形式传递 则会被axios 默认转化为json字符串
            //此处后台需要一个FromData 对象  该对象需要我们手动传入 则不能使用{}
            url: '/v1_0/user/photo',
            method: 'PATCH',
            data: fd
        })
    }
    //用户修改接口
export const UserChangeInfo = (obj) => {
        return axiosHttp({
            url: '/v1_0/user/profile',
            method: 'PATCH',
            //此处不能将所有的数据一起传递给后台 因为 data中如果数据为null 也会传递给后台 parmas 则不会
            // data: {
            //     name,
            //     gender,
            //     birthday,
            //     real_name,
            //     intro
            // }
            data: obj
        })
    }
    //获取用户粉丝列表
export const Fans = () => {
    return axiosHttp({
        url: '/v1_0/user/followers',
        method: 'GET',
        params: {
            page: 1,
            per_page: 10
        }
    })
}