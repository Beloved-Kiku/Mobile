<template>
  <div class="master">
    <van-sticky>
      <van-nav-bar title="BelovedHeadLine" left-arrow @click-left="onClickLeft">
        ></van-nav-bar
      >
    </van-sticky>
  </div>
</template>

<script>
export default {
    data() {
        return {
            property: 'value',
        };
    },
};
</script>

<style lang="less" scoped>
.master /deep/ .van-nav-bar {
  background-color: red;
}
.master /deep/ .van-nav-bar__title {
  color: #fff;
  font-weight: bold;
}
</style>