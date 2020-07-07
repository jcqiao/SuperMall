<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="toshop">
      去结算：{{totalLen}}
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
      totalPrice:0,
      totalLen:0
    }
  },
  mounted() {
    this.$bus.$on('compute',totalPrice => {
      this.totalPrice = totalPrice
    })

    this.$bus.$on('toshop', totalLen => {
      this.totalLen = totalLen
    })
  }
  
		
    
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    display: flex;
  }
  .check-all, .total-price, .toshop{
    /* height: 40px; */
    padding-left: 5px;
    line-height: 40px;
  }
  .check-button{
    display: inline;
    margin-right: 5px;
  }
  .total-price {
    display: inline;
  }
  .toshop{
    width: 100px;
    height: 40px;
    text-align: center;
    position: absolute;
    right: 10px;
    background-color: red;
  }
</style>