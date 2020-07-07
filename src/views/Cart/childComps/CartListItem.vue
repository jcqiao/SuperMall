<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :isCheck="ccheck" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'

export default {
  name: 'CartListItem',
  components:{
    CheckButton
  },
  data(){
    return {
      ccheck:false,
      totalPrice:0,
      totalLen:0
     }
  },
   computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),
   },
  props: {
    product:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkClick(){
      this.product.check = !this.product.check
      this.ccheck = this.product.check

      this.totalPrice = this.cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
        console.log(this.totalPrice)

      this.totalLen = this.cartList.filter(item => item.check).length
      
      this.$bus.$emit('compute', this.totalPrice)
      this.$bus.$emit('toshop', this.totalLen)
    }
  }
}
</script>

<style scoped>
  #shop-item{
    width: 100%;
    padding: 5px;
    border-bottom: 2px solid #666;
    display: flex;
  }
  .item-selector{
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 15px;
  }

  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
  .info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }


/*   #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
   
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
/*
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  } */
</style>