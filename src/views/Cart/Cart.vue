<template>
  <div class="cart">
    <nav-bar class="cart-bar">
      <div slot="middle">购物车({{cartLen}})</div>
    </nav-bar>
    
    <scroll :probeType="3"
    :pullUpLoad="true"
    class="content"
    ref="scroll">
      <cart-list></cart-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

import CartList from './childComps/CartList'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    
    Scroll
  },
  data(){
    return {
      
    }
  },
  computed:{
    // cartLen(){
    //   return this.$store.getters.cartLen
    // }
    ...mapGetters([
      'cartLen'
    ])
    //mapGetters起别名
    // ...mapGetters({
    //   len: 'cartLen'
    // })
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
  .cart-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>