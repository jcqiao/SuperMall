<template>
  <div class="check-button" :class="{'check':isCheck}">{{isCheck}}
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>

</template>

<script>
export default {
  name:'CheckButton',
  props: {
    isCheck:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    text(){
      console.log(this.isCheck)
    }
  }
}
</script>

<style scoped>
  .check-button{
    
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    border-color: chocolate;
    background-color: chocolate;
  }
</style>