<template>
  <div class="backTop" >
    <!-- @click="backTopClick" -->
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  methods:{
    // backTopClick(){
      //这里不好监听 需要拿到BScroll对象
      //在这个组件中操作Scroll组件回到顶部不好
    // }

   
  }
}
</script>

<style scoped>
  .backTop{
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 9;
  }

  .backTop img{
    width: 40px;
    height: 40px;
  }
</style>