<template>
  <div class="Home">
    <van-sticky>
      <van-nav-bar title="BelovedHeadLine">
        <template #left>
          {{ currentTime }}
        </template>
        <template #right @click="aaa"> <van-icon name="search" size="0.48rem" @click="goToSearch"/> </template
      ></van-nav-bar>
    </van-sticky>
    <!----Tab栏-->
    <van-tabs v-model="channelId" background="red" color="#fff" animated>
      <van-tab
        :title="tabValue.name"
        v-for="tabValue in tabList"
        :key="tabValue.id"
        @change="tabValue.id"
      >
        <ArtList :channelId="channelId"></ArtList>
      </van-tab>
    </van-tabs>
    <van-icon
      name="plus"
      class="moreChannels"
      size="0.56rem"
      color="#fff"
      @click="addTabs"
    />
    <van-cell is-link @click="showPopup"></van-cell>
    <van-popup
      v-model="show"
      class="mask"
      get-container="body"
      close-icon-position="top-left"
      closeable
    >
      <ArtChannel :tabList="tabList" :getUserTabList="getUserTabList"></ArtChannel>
    </van-popup>
  </div>
</template>
</template>
<script>
import { Api, AllTab } from "@/api/index";
import ArtList from "@/components/ArtList/index.vue";
import ArtChannel from "@/components/ArtChannel/ArtChannel.vue";
import { Notify } from "vant";
export default {
  name: "Home",
  data() {
    return {
      property: "value",
      channelId: 0,
      tabList: [],
      AllTabList: [],
      show: false, //添加面板显示与否
      timer: "", //定义一个定时器的变量
      currentTime:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(), // 获取当前时间
    };
  },
  components: {
    ArtList,
    ArtChannel,
  },
  methods: {
    //时间
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
    // 添加tab模块
    showPopup() {
      this.show = true;
    },
    addTabs() {
      this.showPopup();
    },
    goToSearch(){
      this.$router.push({
        name:'Search'
      })
    }
  },
  async created() {
    //获取默认Tab 列表 或者用户选择的tab
    try {
      const res = await Api();
      this.tabList = res.data.data.channels;
    } catch (error) {
      Notify({ type: "danger", message: error.message, duration: 5000 });
    }
    //获取所有tab
    try {
      const res = await AllTab();
      this.AllTabList = res.data.data.channels;
    } catch (error) {}
  },
  mounted() {
    //时间戳获取 实时时间
    var vm = this;
    this.timer = setInterval(() => {
      var y = new Date().getFullYear();
      var m = vm.appendZero(new Date().getMonth() + 1);
      var d = vm.appendZero(new Date().getDate());
      var ho = vm.appendZero(new Date().getHours());
      var mi = vm.appendZero(new Date().getMinutes());
      var se = vm.appendZero(new Date().getSeconds());
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  computed: {
    getUserTabList() {
      const newArr = this.AllTabList.filter((item) => {
        const index = this.tabList.findIndex((obj) => {
          return item.id === obj.id;
        });
        if (index > -1) {
          return false;
        } else {
          return true;
        }
      });
      return newArr;
    },
  },
};
</script>

<style lang="less" scoped>
.Home /deep/ .van-nav-bar {
  background-color: red;
}

.Home /deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 0.1875rem /* 15/80 */;
  font-weight: bold;
}

.Home /deep/.van-nav-bar .van-icon {
  color: #fff;
}

.Home /deep/ .van-tab {
  color: skyblue;
  font-weight: 700;
  font-size: 0.1875rem /* 15/80 */;
}

.Home /deep/.van-tab--active {
  color: #fff;
  font-weight: 700;
  font-size: 0.375rem /* 30/80 */;
  /* 30/80 */
  /* 24/80 */
  /* 15/80 */
}
.Home /deep/.van-tabs__content {
  font-size: 0.25rem /* 20/80 */ /* 16/80 */;
  color: #fff;
}
.Home /deep/ .van-nav-bar__left {
  color: #fff;
  font-size: 0.125rem /* 10/80 */;
}
/deep/ .van-tab__warp {
  padding-right: 0.25rem /* 20/80 */;
}
.moreChannels {
  position: fixed;
  top: 1.5rem /* 100/80 */;
  right: 0.1rem /* 8/80 */;
  z-index: 9999;
}
.mask {
  width: 100%;
  height: 100vh;
}
</style>