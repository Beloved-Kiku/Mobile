<template>
  <div class="ArtItem">
    <van-swipe-cell ref="aaa">
      <van-card
        num="1"
        tag="Beloved"
        price="Free"
        :desc="obj.title"
        class="goods-card"
        :thumb="obj.cover.images[0]"
      />
      <template #right>
        <van-button
          square
          text="不喜欢"
          type="danger"
          class="delete-button"
          @click="Delete(obj.art_id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// 引入不喜欢接口
import { ArtDisLikeApi } from "@/api/index";
import { Toast } from "vant";
export default {
  name: "ArtItem",
  data() {
    return {
      show: false,
      isDelete: true,
      successIcon : require('@/assets/Kikus.jpg'),
      failedIcon :require('@/assets/Kiku.jpg')
    };
  },
  props: ["obj"],
  methods: {
    async Delete(channelId) {
      try {
        const DisLike = await ArtDisLikeApi({
          target: channelId,
        });
        console.log(DisLike.data.message);
        if (DisLike.status === 201) {
          console.log("222");
          Toast({
            message: "我们会减少推荐该类文章",
            type:'success',
            icon:this.successIcon,
          });
        }
      } catch (error) {
        Toast({
          type:'fail',
          message:error.response.status,
          icon:failedIcon
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
 /deep/.van-toast__text{
  font-size: 1.25rem /* 100/80 */;
  color: red;
}
 .van-toast  {
  width: 8.75rem /* 700/80 */;
  height: 3.75rem /* 300/80 */;
}
</style>