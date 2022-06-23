<template>
  <div class="Search">
    <van-nav-bar
      title="BelovedHeadLine"
      left-arrow
      @click-left="onClickLeft"
      @clear="clearInput"
    />
    <van-search
      v-model.trim="SearchKeyWords"
      shape="round"
      background="red"
      placeholder="请输入搜索关键词"
      autofocus
      @search="search"
      @input="input"
    />
    <div class="box" v-show="isShow">
      <van-cell
        :title="obj"
        :value="obj"
        size="large"
        v-for="(obj, index) in SearchList"
        :key="index"
        @click="goSearchValue(obj)"
      />
    </div>
  </div>
</template>

<script>
import { SearchValue } from "@/api";
export default {
  name: "Search",
  data() {
    return {
      SearchKeyWords: "",
      timer: null,
      isShow: false,
      SearchList: [],
    };
  },
  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.back();
    },
    //回车键的回调函数
    search() {
      console.log("1111");
    },
    //输入框内容发生改变时候触发事件
    //短时间内触发取消上一次事件 执行最后一次
    input() {
      //此处需要用到防抖
      if (this.SearchKeyWords.length > 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          const Search = await SearchValue({
            q: this.SearchKeyWords,
          });
          this.SearchList = Search.data.data.options;
          //ajax异步请求完毕 页面同时渲染 后展示
          this.isShow = true;
        }, 500);
      }
      if (this.SearchKeyWords == "") {
        //关闭联想信息补全
        this.isShow = false;
      }
    },
    //点击右边按钮时候的事件回调
    clearInput() {
      //关闭联想信息补全
      this.isShow = false;
    },
    //点击联想 路由跳转 到达 搜索结果页面
    goSearchValue() {
      console.log("111");
      this.$router.push({
        name: "SearchValue",
        query: {
          page: 1,
          per_page: 5,
          q: this.SearchKeyWords,
        },
      });
    },
  },

  computed: {
    /*
    //未处理 字体高亮效果
    HeightFn(){
      return this.SearchList.splice(this.SearchKeyWords,`<a color="red">${this.SearchKeyWords}</a>`)
    }
    */
  },
};
</script>

<style lang="less" scoped>
.Search /deep/ .van-nav-bar {
  background-color: red;
}

.Search /deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 0.1875rem /* 15/80 */;
  font-weight: bold;
}

.Search /deep/.van-nav-bar .van-icon {
  color: #fff;
}
</style>