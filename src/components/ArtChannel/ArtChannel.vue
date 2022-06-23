<template>
  <div class="box">
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="ChannelManagement">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title" v-show="isEdit"> 点击标签即可移除 </span>
        </span>
        <span @click="Edit">{{ isEdit ? "完成" : "编辑" }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row>
        <van-col
          span="6"
          v-for="objTwo in tabList"
          :key="objTwo.id"
          @click="Delete(objTwo)"
        >
          <div class="channel-item van-hairline--surround">
            {{ objTwo.name }}
            <!-- 删除的徽标 -->
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>{{isEdit ? '点击添加更多频道':'点击进入频道'}}</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row>
        <van-col
          span="6"
          v-for="obj in getUserTabList"
          :key="obj.id"
          @click="addTab(obj)"
        >
          <div class="channel-item van-hairline--surround">{{ obj.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
//导入删除接口
import {DeleteApi} from '@/api'
export default {
  name: "ArtChannel",
  data() {
    return {
      property: "value",
      isEdit: false,
    };
  },
  props: ["tabList", "getUserTabList"],
  methods: {
    Edit() {
      this.isEdit = !this.isEdit;
    },
    //点击标签实现添加  点击传入 点击的obj
    addTab(obj) {
      if (this.isEdit) {
        this.tabList.push(obj);
      }
    },
    //删除
   async  Delete(obj) {
      if (this.isEdit) {
        //利用索引 判断出选择删除的 在原数组中的位置 进行删除
        let index  =this.tabList.findIndex(item =>obj.id===item.id)
        //删除点击的对象数组
        this.tabList.splice(index,1);
        const DeleteValue = await DeleteApi({
          target:obj.id
        })
      }
    },
  },
  computed:{
    DeleteTab(){
      
    }
  }
};
</script>

<style lang="less" scoped>
.box /deep/ .van-nav-bar {
  background-color: red;
}
.box /deep/.van-nav-bar__title {
  color: #fff;
  font-size: 0.1875rem /* 15/80 */;
  font-weight: bold;
}
.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>