<template>
  <div class="cart">
    <nav-bar class="cart-bar">
      <div slot="middle">购物车({{cartLen}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar
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
  }
}
</script>
<style scoped>
  .cart-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>