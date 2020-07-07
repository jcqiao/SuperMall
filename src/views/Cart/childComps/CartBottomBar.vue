<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  data(){
    return {
      totalPrice:0
    }
  },
  mounted() {
    this.$bus.$on('compute',totalPrice => {
      this.totalPrice = totalPrice
    })
  }
  
		
    
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: absolute;
    bottom: 49px;
    right: 0;
    left: 0;
    display: flex;
  }
  .check-all, .total-price{
    /* height: 40px; */
    padding-left: 5px;
    line-height: 40px;
  }
  .check-button{
    display: inline;
    margin-right: 5px;
  }
  .total-price{
    display: inline;
  }
</style>