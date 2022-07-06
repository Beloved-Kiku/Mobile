<template>

 <div class="user-container">
     <van-sticky>
      <van-nav-bar title="BelovedHeadLine"></van-nav-bar>
    </van-sticky>
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
     <van-image fit="cover" round :src="PicSrc"/>
        </template>
        <template #title>
          <span class="username">
        <span>姓名:</span>{{UserMsg.name}}</br>
        <span>职位:</span>{{work}}</br>
        <span>职称:</span>{{name}}</br>
          </span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{UserMsg.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{UserMsg.fans_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{UserMsg.fans_count}}</span>
          <span @click="getFans">粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" @click="gotoMyMsg" is-link/>
      <van-cell icon="chat-o" title="小思同学" is-link to="/chat"/>
      <van-cell icon="warning-o" title="退出登录" is-link @click="quitFn"/>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog, Toast } from "vant";
//引入个人信息接口
import { UserInfo } from "@/api";
//引入 清除Token 函数
import {removeToken} from '@/utils/token'
//引入获取粉丝接口
import { Fans } from "@/api";
export default {
  name: "User",
  data() {
    return {
      property: "value",
      UserMsg: {},
      offer:'黑马程序员',
      work:"前端开发",
      name:'Beloved',
      isShowMyPic:true,
      FansList:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //发送Ajax 拿到页面基础数据
    async getUserInfo() {
      try {
        const res = await UserInfo();
        this.UserMsg = res.data.data;
      } catch (error) {}
    },
    gotoMyMsg(){
      //派发Vuex事件
      this.$store.commit('Pic',this.isShowMyPic)
      console.log(this.$store);
      this.$router.push('/user_edit')
    },
    quitFn() {
      //退出登录
      Dialog.confirm({
        title: "退出登录",
        message: "确定要退出么",
      })
        .then(() => {
          //Dialog 本质是一个Promise 对象 .then 确定的回调
          removeToken();
          //清除Token  当用户再次到个人中心 未登录 AXios 拦截器中
          // 对401的Axios 自动拦截并且跳转到Login
          this.$router.replace('/Login')
        })
        .catch(() => {
       Toast('那就再玩会吧!')
        });
    },
    //获取粉丝
    async getFans(){
      //发送Ajax
      const res  = await Fans()
      if(res.data.data.results.length===0){
        Toast('你还没有粉丝')
      }
      else{
        this.FansList = res.data.data.results
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  computed:{
    ...mapState(['PicPd']),
    ...mapState(['PicSrc'])
  }
};
</script>

<style lang="less" scoped>
.user-container /deep/ .van-nav-bar {
  background-color: red;
}
.user-container /deep/ .van-nav-bar__title {
  color: #fff;
  font-weight: bold;
}
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
.user-container .user-card /deep/ .van-image__img{
  width:3.75rem /* 300/80 */ /* 200/80 *//* 100/80 */;
  height: 3.75rem /* 300/80 */ /* 200/80 */ /* 100/80 */;
}
</style>