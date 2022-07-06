<template>
  <div>
  <router-view>></router-view>
  <van-tabbar v-model="active" active-color="red">
  <van-tabbar-item icon="home-o" active to="/layout/Home" name="home">Home</van-tabbar-item>
  <van-tabbar-item icon="setting-o" active to="/layout/User" name="search">PersonalCenter</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
     active: 'home',
    };
  },
};
</script>
<style lang="less" scoped>

</style>