<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    /* height: 44px;  line-height可以撑开div*/
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* background-color: rosybrown; 不能在公共部分写*/
  }
  .left, .right{
    width: 60px;
    /* background-color: black; */
  }
  .middle{
    flex: 1;
  }
</style>