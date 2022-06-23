//统一对Token 增删改查
//存储Token
const key = 'UserToken'
export const setToken = (token) => {
        return localStorage.setItem(key, token)
    }
    //获取Token
export const getToken = () => {
        return localStorage.getItem(key)
    }
    //移除Token
export const removeToken = () => {
    return localStorage.removeItem(key)
}