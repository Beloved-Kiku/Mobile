<template>
  <div class="master">
    <van-sticky>
      <van-nav-bar title="小思助手" left-arrow @click-left="onClickLeft">
        ></van-nav-bar
      >
    </van-sticky>
    <div class="chat-list">
      <div v-for="(obj ,index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name!=='me'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{obj.msg}}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{obj.msg}}</div>
          <van-image fit="cover" round :src="PicSrc"/>
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="word" placeholder="说点什么...">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="SendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
//引入 WebSocket
import { io } from "socket.io-client";
//引入获取用户token方法
import { getToken } from "@/utils/token.js";
//引入Vuex 方法
import { mapState } from "vuex";
export default {
  data() {
    return {
      property: "value",
      socket: null, //用于建立WebSocket
      word: "", //用户发送的内容
      //数据以kv存储 当页面需要加载时候 利用k 判断哪个需要加载
      list: [
        {
          name: "xs",
          msg: "Hi,我是爱思助手",
        },
      ], //建立数组 存储 服务端返回的数据
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //初始化 连接客户端
    setWebSocket() {
      //初始化WebSocket
      //io  对象内接 后端服务基地址
      this.socket = io("http://geek.itheima.net", {
        query: {
          token: getToken(),
        },
        transports: ["websocket"],
      });
      //测试是否连接成功
      this.socket.on("connect", () => {
        console.log('连接服务端成功');
      });
      //用户输入后 v-for 拿着数据重新渲染 同时触发改钩子函数 后台响应本次数据
      //将这次返回的数据展示
      this.socket.on("message", (obj) => {
        this.list.push({
            name:'xs',
            msg:obj.msg
        })
      });
    },
    //用户发送事件
    SendFn() {
      //触发客户端事件传递数据
      this.socket.emit("message", {
             msg: this.word,
           timestamp:new Date(),
      });
      //将用户输入的显示到页面 v-for 拿到数据重新渲染页面 将用户输入的展示到页面吧并且发送给后台
      this.list.push({
        name:'me',
        msg:this.word
      })
      this.word =''
    },
  },
  created() {
    //连接客户端 使用WebSocket
    this.setWebSocket();
  },
  beforeDestroy(){
    //组件销毁前关闭服务
    this.socket.close()
    this.socket =null
    console.log('销毁成功');
  },
  computed:{
    //判断用户是否修改头像
    ...mapState(['PicPd']),
    //提取用户响应式头像数据
    ...mapState(['PicSrc'])
  }
};
</script>

<style lang="less" scoped>
.master /deep/ .van-nav-bar {
  background-color: red;
}
.master /deep/ .van-nav-bar__title {
  color: #fff;
  font-weight: bold;
}
.master {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 0 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>