<template>
  <div class="Center">
    <van-sticky>
      <van-nav-bar
        title="MyInforMationCenter"
        left-arrow
        @click-left="onClickLeft"
        >></van-nav-bar
      >
    </van-sticky>
    <van-cell
      title="头像"
      is-link=""
      arrow-direction
      title-style="margin-left:15px"
      @click="uploadPhoto"
    >
      <template #right-icon>
       <img :src="PicSrc" alt="" style="width:100px height:120px"/>
      </template>
      <input
        type="file"
        accept="image/*"
        v-show="false"
        ref="FileFn"
        @change="SendFile($event)"
      />
    </van-cell>
    <van-cell>
      <van-cell
        title="姓名"
        is-link
        :value="PersonalMsg.name"
        @click="ChangeName"
      />
      <van-cell title="性别" is-link :value="Sex"  @click="ChangeSex"/>
      <van-cell title="电话" is-link :value="PersonalMsg.mobile"/>
      <van-cell title="生日" is-link :value="PersonalMsg.birthday" @click="ChangeBir" />

      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    </van-cell>
    <!---修改名字 弹出层-->
    <van-dialog v-model="show" title="修改用户名" show-cancel-button  @confirm="SendName">
      <van-cell-group>
        <van-field
          v-model="value"
          label=""
          input-align="center"
          maxlength="11"
          show-word-limit
          ref="inputFn"
        />
      </van-cell-group>
    </van-dialog>
    <!---修改性别 弹出层-->
    <van-dialog v-model="SexShow" title="选择你的性别" show-cancel-button>
    </van-dialog>
    <!---修改生日-->
    <van-popup v-model="BirShow" round position="bottom" :style="{ height: '60%' }">
    <van-datetime-picker item-height="60"
    v-model="currentDate"
    type="date"
   title="选择你的生日"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="TimeFn(value)"
  @cancel="cancel"
  ref="Timer"
/>
    </van-popup>

  </div>
</template>

<script>
//注册组件
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
//引入用户默认个人资料接口
import { defaultMsg } from "@/api";
import { Toast } from "vant";
//引入修改头像接口
import { ChangeHeadPic } from "@/api";
//引入用户修改基本信息接口
import {UserChangeInfo} from '@/api'
//导入DayJS
const dayjs = require('dayjs')
dayjs().format()
//引入Vuex Map 方法
import { mapState } from "vuex";
export default {
  data() {
    return {
      property: "value",
      PersonalMsg: {},
      show: false,
      SexShow:false,
      BirShow:false,
      value: "",
      radio:'',
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),//当前事件
      k:false
    };
  },
  methods: {
    //跳转到上一级
    onClickLeft() {
      this.$router.back();
    },
    //获取用户编辑默认资料
    async GetMsg() {
      try {
        const res = await defaultMsg();
        this.PersonalMsg = res.data.data;
      } catch (error) {
        console.log(error.message);
        Toast.fail("出错咯");
      }
    },
    //头像上传
    uploadPhoto() {
      //此处用到JS模拟转移 通过在 input 绑定ref 获得input原生标签
      //在用户点击图片时候拿到ref调用原生JS input 身上的点击事件
      //在input身上绑定表单改变事件 当用户选择图片后实时监测 并发送给后台
      //console.log(this.$refs.FileFn);
      this.$refs.FileFn.click();
    },
    //修改头像
    async SendFile(e) {
      if (e.target.files[0] == undefined) {
        return;
      }
      let FromObj = new FormData();
      //当input 发生改变后 发送Ajax请求
      //此处后台需要FromData 对象的数据 而不是Json  所以需要我们自己构建
      //内置append 函数 添加 kv
      FromObj.append("photo", e.target.files[0]);
      const res = await ChangeHeadPic(FromObj);
      this.PersonalMsg.photo = res.data.data.photo;
      //将图片保存到Vuex中
      this.$store.commit('SendPic',this.PersonalMsg.photo)
    },
    //修改名字 ,输入框内的事件处理
    ChangeName() {
       //显示修改输入框
      this.show = true;
      //输入框默认的值
      this.value = this.PersonalMsg.name
      //获取焦点
      this.$nextTick(()=>{
        //数据是异步更新次数需要等DOM结构完全加载完毕后 立即执行该回调函数 获取Vant组件原生标签 调取focus事件
        this.$refs.inputFn.focus()
      })
    },
    //修改名字 确定事件处理 提交数据给后台
  async  SendName(){
    const res =  await UserChangeInfo({
        name:this.value
    });
    //请求成功 更新页面名字
    this.PersonalMsg.name = this.value
    },
    //修改性别
    ChangeSex(){
        this.SexShow = true
    },
    //弹出日期
    ChangeBir(){
        //弹出日期
        this.BirShow = true
        //显示默认日期
        console.log(this.PersonalMsg.birthday);
        this.currentDate = new Date(this.PersonalMsg.birthday)
    },
    //确定修改生日
  async   TimeFn(){
        let  Date = this.currentDate
        //加载dayjs
        var customParseFormat = require('dayjs/plugin/customParseFormat')
        dayjs.extend(customParseFormat);
        //格式化时间 转化为字符串
        let NewDate = dayjs(Date).format('YYYY-MM-DD')
        //发起AJAX
        const res =  await UserChangeInfo({
        birthday:NewDate
    });
    this.PersonalMsg.birthday = NewDate
    this.BirShow = false
    },
    //关闭时间层
    cancel(){
       this.BirShow = false
    },
  },
  created() {
    this.GetMsg();
  },
  computed: {
    //根据后台数据计算出性别
    Sex() {
      return this.PersonalMsg.gender == 1 ? "男" : "女";
    },
    ...mapState(['PicPd']),
    ...mapState(['PicSrc'])
  },
};
</script>
<style lang="less" scoped>
.Center /deep/ .van-cell img {
  width: 60px /* 40/80 */;
  height: 40px /* 40/80 */;
  border-radius: 50%;
}
.Center /deep/ .van-nav-bar {
  background-color: red;
}
.Center /deep/ .van-nav-bar__title {
  color: #fff;
  font-weight: bold;
}
</style>