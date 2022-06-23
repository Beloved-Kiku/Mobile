<template>
  <div class="SearchValue">
    <van-sticky>
      <van-nav-bar title="BelovedHeadLine"
      left-arrow
      @click-left="onClickLeft"
      > ></van-nav-bar>
    </van-sticky>
    <van-swipe-cell v-for="(obj,index) in SearchValueList.results" :key="index">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
//引入搜索结果接口
//引入Vant 组件
import { SearchIndex } from "@/api";
import { Notify } from "vant";
export default {
  name: "SearchValue",
  data() {
    return {
      SearchValueList: {},
    };
  },
  async created() {
    // 页面加载 解构赋值 得到AJAX参数 发起请求
    let { page, per_page, q } = this.$route.query;
    try {
      const SearchValue = await SearchIndex({
        page,
        per_page,
        q,
      });
      Notify({ type: "success", message: "GetMessageSuccess", duration: 5000 });
      this.SearchValueList = SearchValue.data.data;
    } catch (error) {
      Notify({ type: "danger", message: error.message, duration: 5000 });
    }
  },
  methods: {
    getSearchValue() {
      console.log("111");
    },
    onClickLeft(){
        this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
.SearchValue .goods-card {
  margin: 0;
  background-color: white;
}

.SearchValue .delete-button {
  height: 100%;
}
.SearchValue /deep/ .van-nav-bar {
  background-color: red;
}

.SearchValue /deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 0.1875rem /* 15/80 */;
  font-weight: bold;
}

.SearchValue /deep/.van-nav-bar .van-icon {
  color: #fff;
}
</style>