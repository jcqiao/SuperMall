<template>
    <tabbar>
      <tabitem p="/home" isColor="red">
          <img slot="item-icon" src="../../assets/img/tabbar/home.svg" alt="">
          <img slot="item-icon-active" src="../../assets/img/tabbar/home_active.svg" alt="">
          <div slot="item-text">首页</div>
      </tabitem>
      <tabitem p="/category" isColor="red">
          <img slot="item-icon" src="../../assets/img/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="../../assets/img/tabbar/category_active.svg" alt="">
          <div slot="item-text">分类</div>
      </tabitem>
      <tabitem p="/cart" isColor="red">
          <img slot="item-icon" src="../../assets/img/tabbar/shopcart.svg" alt="">
          <img slot="item-icon-active" src="../../assets/img/tabbar/shopcart_active.svg" alt="">
          <div slot="item-text">购物车</div>
      </tabitem>
      <tabitem p="/profile" isColor="red">
          <img slot="item-icon" src="../../assets/img/tabbar/profile.svg" alt="">
          <img slot="item-icon-active" src="../../assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item-text">我的</div>
      </tabitem>
    </tabbar>
  
</template>

<script>
import tabbar from '../../components/common/tabbar/TabBar.vue'
import tabitem from '../../components/common/tabbar/TabItem.vue'

export default {
  name:"mainTabBar",
    components: {
    tabbar,
    tabitem
  }
}
</script>
<style scoped>

</style>