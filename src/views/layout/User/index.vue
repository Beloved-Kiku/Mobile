<template>
    <div class="PersonalCenter">
    
        <van-nav-bar title="PersonalCenter" left-text="" left-arrow @click-left="onClickLeft" />
    
    </div>
</template>

<script>
export default {
    name: "User",
    data() {
        return {
            property: "value",
        };
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        }
    }
};
</script>

<style lang="less" scoped>
.PersonalCenter /deep/ .van-nav-bar {
    background-color: red;
}

.PersonalCenter /deep/ .van-nav-bar__title {
    color: #fff;
    font-size: .1875rem/* 15/80 */
    ;
    font-weight: 700;
}
</style>