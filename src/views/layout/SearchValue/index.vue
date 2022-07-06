<template>
  <div class="SearchValue">
    <van-sticky>
      <van-nav-bar title="BelovedHeadLine" left-arrow @click-left="onClickLeft">
        ></van-nav-bar
      >
    </van-sticky>
    <van-list
   v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="false"
>
    <van-swipe-cell
      v-for="(obj, index) in SearchValueList"
      :key="index"
      @click.native="gotoDeail(obj.art_id)"
    >
      <van-card
        :desc="obj.pubdate"
        :title="obj.title"
        class="goods-card"
        thumb="https://pic.imgdb.cn/item/62b491d30947543129730a93.jpg"
      />
    </van-swipe-cell>
    </van-list>
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
      SearchValueList: [],
      successIcon: require("@/assets/Kikus.jpg"),
      loading: false,
      finished: false,
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
      this.SearchValueList = SearchValue.data.data.results;
    } catch (error) {
      Notify({ type: "danger", message: error.message, duration: 5000 });
      
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    gotoDeail(id){
      this.$router.push({
        //传递文章id
        path:`/ArtDeail/${id}`
      })
    },
    //下滑加载
   async  onLoad(){
      //发送Ajax获得数据
       let { page, q } = this.$route.query;
       try {
      const SearchValue = await SearchIndex({
        page,
        per_page:100,
        q,
      })
      //判断返回数据 如果为空则说明后台已经没有数据了 则停止一切Ajax请求
       if(SearchValue.data.data.results.length===0){
        this.finished =true
        return
      }
      this.SearchValueList = [...this.SearchValueList,...SearchValue.data.data.results]
      Notify({ type: "success", message: "GetMessageSuccess", duration: 5000 });
      //新旧数组合并  返回新的数组
      this.loading = false
    } catch (error) {
      console.log(error.message);
      Notify({ type: "danger", message: error.message, duration: 5000 });
    }
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