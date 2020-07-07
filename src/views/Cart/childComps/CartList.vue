<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"></cart-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'
import CartBottomBar from './CartBottomBar'

export default {
  name:'CartList',
  components: {
    CartListItem,
    CartBottomBar
  },
  created() {
    console.log(this.$store.state.cartList)
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])    
  },
  activated() {

  }
 }
</script>

<style scoped>

</style>