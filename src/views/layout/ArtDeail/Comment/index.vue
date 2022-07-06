<template>
  <div>
<van-cell>
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon>
    <van-icon name="like" size="large" color="gray"/>
     <van-icon name="like" size="large" color="red"/>
  </template>
</van-cell>
  </div>
</template>

<script>
//引入评论内容
export default {
data() {
    return {
        property: 'value',
        id :null
    };
},
methods:{

},
watch:{
    id(a,b){
this.$nextTick(()=>{
    this.id = this.ArtId
})
    }
},
created () {
    this.$nextTick(()=>{
        console.log('222');
    })
},
props:['ArtId'],
}
</script>

<style>

</style>