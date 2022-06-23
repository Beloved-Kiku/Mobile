//px自动转rem配置
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //rootValue :转化px的基准值
            rootValue: 37.5,
            propList: ['*']
        }
    }
}