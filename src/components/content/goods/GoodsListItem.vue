<template>
  <div class="goods-list-item" @click="toDetail">
    <img :src="showImage" alt="" @load="imageLoad" >
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem :{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img;
    }
   },
  methods:{
    imageLoad(){
      //$bus是vuex中的属性 事件总线
      this.$bus.$emit('itemImgLoad')
    },
    /**
    * 跳转到详情页
    */
    toDetail(){
      this.$router.push('/detail/'+this.goodsItem.iid)
      // console.log('跳转到详情页')
  }
  },
 
  // created(){
  //   console.log(this.goodsItem)
  // }

}
</script>

<style scoped>
.goods-list-item{
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-list-item img{
  width:100%;
  border-radius: 5px;
  /* padding: 5px; */
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .cfav{
   position: relative;
}
.goods-info .cfav::before{
   content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px no-repeat;
    /* url color bg-position/bg-size  repeated */
}
</style>