<template>
  <div class="bottom-bar">
    <div class="check-all" >
      <check-button class="check-button" :class="{'checkAll':checkAll}"
      @click.native="checkAllClick"></check-button>
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
import {mapGetters} from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  data(){
    return {
      totalPrice:0,
      totalLen:0,
      checkAll:false
    }
  },
  mounted() {
    this.$bus.$on('compute',totalPrice => {
      this.totalPrice = totalPrice
    })

    this.$bus.$on('toshop', totalLen => {
      this.totalLen = totalLen
    })

    this.$bus.$on('ischeck', check => {
      this.checkAll = check
    })
  },
  computed:{
    ...mapGetters([
      'cartList'
    ]),
    
  },
  methods:{
    checkAllClick(){
      this.checkAll = !this.checkAll
      // console.log(this.checkAll) 
      if (this.checkAll) {
        this.cartList.forEach(item => {
          item.check = true
       });
      } else {
         this.cartList.forEach(item => {
          item.check = false
       });
      }
    }
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
  .checkAll{
    background-color: red;
  }
</style>