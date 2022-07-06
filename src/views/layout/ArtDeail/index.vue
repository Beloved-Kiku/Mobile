<template>
  <div class="ArtDeail">
    <!----导航栏-->
    <van-sticky>
      <van-nav-bar title="BelovedHeadLine" left-arrow @click-left="onClickLeft">
        ></van-nav-bar
      >
    </van-sticky>
    <!---发布人头像--->
    <div class="user">
      <div class="userPic">
        <img :src="SearchResult.aut_photo" alt="" />
      </div>
      <!----发布人 事件 点赞 关注 区域-->
      <div class="userInfo">
        <div class="userLeft">
          <div class="title">
            <div class="text" style="color: red">
              {{ SearchResult.aut_name }}:
              {{ SearchResult.title }}
            </div>
            <div class="action">
              <!----关注-->
              <div class="good">
                <van-button
                  type="info"
                  size="small"
                  icon="like"
                  color="red"
                  v-if="SearchResult.is_followed"
                ></van-button>
                <van-button
                  plain
                  type="info"
                  size="small"
                  icon="like-o"
                  color="blue"
                  v-else
                  @click="LikeMe(SearchResult.aut_id)"
                ></van-button>
              </div>
              <!----ZAN-->
              <div class="Zan">
                <van-button
                  plain
                  type="info"
                  size="small"
                  icon="good-job-o"
                  v-if="SearchResult.attitude != 1"
                  @click="Zan(SearchResult.art_id)"
                ></van-button>
                <van-button
                  type="info"
                  size="small"
                  icon="good-job-o"
                  color="red"
                  v-else
                ></van-button>
              </div>
              <!--ShouCang--->
              <div class="Sc">
                <van-button
                  plain
                  type="info"
                  size="small"
                  icon="plus"
                  @click="collectArt(SearchResult.art_id)"
                  v-if="SearchResult.is_collected == false"
                ></van-button>
                <van-button
                  type="info"
                  size="small"
                  icon="star"
                  color="red"
                  v-else
                ></van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----时间线-->
    <span class="timer">{{ SearchResult.pubdate }}</span>
    <!----分割线 内容区域-->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >JavaScript Vue.js
    </van-divider>
    <!----分割线 评论-->
    <div v-html="SearchResult.content" class="content"></div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >Comment
    </van-divider>
    <!-----评论区-->
    <Comment :ArtId="SearchResult.art_id"></Comment>
  </div>
</template>
<script>
//引入文章详情接口
import { ArtAllMessage } from "@/api";
//引入对文章点赞接口
import { GoodArt } from "@/api";
//引入收藏接口
import { collect } from "@/api";
//引入关注接口
import { focus } from "@/api";
import { Toast } from "vant";
//引入评论组件
import Comment from "./Comment/index.vue";
//引入评论内容接口
import { CommentValue } from "@/api";
export default {
  name: "ArtDeail",
  data() {
    return {
      property: "value",
      SearchResult: {},
      CommentList: [],
    };
  },
  components: {
    Comment,
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.back();
    },
    async getArtMsg() {
      let article_id = this.$route.params.id;
      const ArtValue = await ArtAllMessage({
        article_id,
      });
      this.SearchResult = ArtValue.data.data;
    },
    //关注作者
    async LikeMe(target) {
      try {
        const res = await focus({ target });
        this.SearchResult.is_followed = true;
        Toast({
          message: "喜欢该文章",
          icon: "like",
        });
      } catch (error) {}
    },
    //对文章点赞
    async Zan(target) {
      try {
        const res = await GoodArt({ target });
        this.SearchResult.attitude = 1;
        Toast({
          message: "已点赞",
          icon: "like",
        });
      } catch (error) {}
    },
    //收藏文章
    async collectArt(target) {
      try {
        const res = await collect({ target });
        this.SearchResult.is_collected = true;
        Toast({
          message: "已收藏",
          icon: "star",
        });
      } catch (error) {}
    },
    //获取 评论详情
    async CommentValue() {
      const res = await CommentValue({
        source: this.SearchResult.art_id,
      });
      this.CommentList = res.data.data.results;
    },
  },
  created() {
    //页面挂载 渲染
    this.getArtMsg();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.ArtDeail /deep/ .van-nav-bar {
  background-color: red;
}

.ArtDeail /deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 0.1875rem /* 15/80 */;
  font-weight: bold;
}

.ArtDeail /deep/.van-nav-bar .van-icon {
  color: #fff;
}
.user {
  display: flex;
}
.user .userPic {
  width: 2.75rem /* 300/80 */ /* 100/80 */;
  height: 2.75rem;
  background-color: red;
}
.user .userInfo {
  display: flex;
  justify-content: space-around;
}
.user .userInfo .userLeft .title {
  font-size: 0.2rem /* 16/80 */;
  display: flex;
}
.user .userInfo .userLeft .title .action {
  margin-right: 0px;
}
.user .userPic img {
  width: 2.75rem /* 10/80 */;
  height: 2.75rem /* 10/80 */;
}
.timer {
  color: red;
  margin-top: 0.125rem /* 10/80 */;
  font-size: 0.2rem /* 16/80 */;
}
.content {
  font-size: 0.15rem /* 12/80 */;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
}
</style>