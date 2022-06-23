<template>
  <div class="Login">
  <van-nav-bar
  title="BelovedHeadLineLogin"
  left-arrow
/>
<van-notice-bar
  left-icon="volume-o" background="#ccc" speed =100
  text="基于Vue2+Vant2搭建的移动端项目,需要技术栈:'HTML5,JavaScript,Vuex VueRouter AXios Less Node.js 若登录出现问题 请联系QQ:3288566340'" 
/>
<van-notice-bar
  left-icon="volume-o" background="skyblue" speed =200
  text="本项目为练习项目 没有完整后台 Login界面 密码统一为:246810" 
/>

<div class="box">
<p>WelCome to My Project</p>
<div class="LoginFrom">
<van-form @submit="onSubmit">
  <van-field
    v-model="userInfo.mobile"
    required
    name="mobile"
    label="Number"
    placeholder="PhoneNumber"
    :rules="[{ required: true, message: 'Enter Your UserName',pattern:/^1[3-9]\d{9}$/ }]"
  />
  <van-field
    v-model="userInfo.code"
    required
    type="Password"
    name="code"
    label="Password"
    placeholder="Password"
    :rules="[{ required: true, message: 'Enter Your Password Six figures at most',pattern:/^\d{6}$/ }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading="loading" loading-text="LoginIng" :disabled="loading">Login</van-button>
  </div>
</van-form>
</div>
</div>
</div>
</template>

<script>
//引入登录接口
import { LoginApi } from '@/api';
//按需引入Vant 组件
import { Notify } from 'vant';
//引入存储Token方法
import {setToken} from '@/utils/token.js'
export default {
    name:'Login',
  data() {
    return {
      userInfo:{
        mobile :'',
        code:'246810'
      },
      loading :false
    };
  },
  methods: {
   async  onSubmit(values) {
        // 提交表单 进行aixos验证
        this.loading = true
        try {
          const LoginValue = await LoginApi(this.userInfo);
          console.log(LoginValue.data.data.token);
          if(LoginValue.status===201){
            //调用Token存储方法 存储Token
            setToken(LoginValue.data.data.token)
            this.loading = false
            Notify({ type: 'success', message: 'Login Success',duration: 3000, });
            this.$router.push({
                path:'/layout/Home'
            })
          }
        } catch (error) {
          console.log(error);
         Notify({ type: 'danger', message: error.message,duration: 5000, });
        }
    },
  },
};

</script>

<style lang="less" scoped>
.Login /deep/.van-nav-bar{background-color:red;
}
.Login /deep/ .van-nav-bar__title{
    color: #fff;
}
.Login /deep/ .van-notice-bar__content {
    color: red;
}
.Login .box{
    height: 7.75rem /* 300/80 */;
    width: 7.75rem /* 300/80 */;
    margin: 0 auto;
    margin-top:1.75rem /* 300/80 */;
    

}
.Login .box p{
    font-size:.4rem /* 32/80 */ /* 24/80 */ /* 14/80 */;
    font-weight: bold;
    text-align:center;
}
.LoginFrom /deep/ .van-button{
    background-color: red;
}
.LoginFrom /deep/  .van-button--info{
        border: 0.02667rem solid red
}
</style>