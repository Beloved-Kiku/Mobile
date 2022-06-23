<template>
  <div>
  <router-view>></router-view>
  <van-tabbar v-model="active" active-color="red">
  <van-tabbar-item icon="home-o" active to="/layout/Home">Home</van-tabbar-item>
  <van-tabbar-item icon="setting-o"  to="/layout/User">PersonalCenter</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
     active: 0,
    };
  },
};
</script>
<style lang="less" scoped>

</style>