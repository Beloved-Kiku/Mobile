<template>
  <div class="ArtList">
 
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="宝贝没有了哦"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArtItem
          v-for="obj in List"
          :key="obj.art_id"
          :obj="obj" 
        ></ArtItem> </van-list
    >
  </div>
</template>

<script>
import { ArtListApi } from "@/api/index";
import ArtItem from "@/components/ArtItems/index.vue";
import { Notify } from "vant";
export default {
  data() {
    return {
      List: [],
      loading: false,
      finished: false,
      timestamp: new Date(),
      isLoading:false
    };
  },
  methods: {
    //处理用户向上加载的事件
    async onLoad() {
      try {
        const ListValue = await ArtListApi({
          channel_id: this.channelId,
          timestamp: this.timestamp,
        });
        //一次请求成功后的事件
        if(this.List.length===0){
            this.loading =false
        }
        if (ListValue.status === 200) {
          //将本次请求的数据和上次的数据进行 参数合并
          this.List = [...this.List, ...ListValue.data.data.results] ||{};
          //保存下次刷新的时间戳
          this.timestamp = ListValue.data.data.pre_timestamp;
          this.loading = false;
          //当多次请求后 后台参数为空时候 停止请求
        }
        //结束加载状态
      } catch (error) {
        this.finished = true;
        Notify({
          type: "danger",
          message: "数据错误, 可能已经加载完毕了",
          duration: 5000,
        });
      }
    },
    // 处理用户向下刷新的事件
    // 数据不更新

  },
  // 页面挂载获取列表数据
   async created() {
    try {
      const ListValue = await ArtListApi({
        channel_id: this.channelId,
        timestamp: this.timestamp,
      });
      if (ListValue.status === 200) {
        this.List = ListValue.data.data.results ||[]
        //保存下次刷新的时间戳
        this.timestamp = ListValue.data.data.pre_timestamp;
      }
    } catch (error) {
      Notify({ type: "danger", message: error.message, duration: 5000 });
    }
  },
   components: {
    ArtItem,
  },
  props: ["channelId"],
};
</script>

<style lang="less" scoped>
</style>