<template>
  <div id="detail">
    <nav-bar class="navbar">
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
        
      </div>
      <div slot="middle">
        <detail-nav-item :detailItem = "['商品','参数','评论','推荐']"
        @detailNavClick="detailNavClick" ref="nav"></detail-nav-item>
      </div>
    </nav-bar>

    <scroll class="content" ref="scroll" @scroll="scrollShow" :probeType="3">
      <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages">
          <img :src="item" alt="" >
        </swiper-item>
      </swiper>

      <detail-base-info :goods="goods"></detail-base-info>

      <detail-shop-info :shop="shop"></detail-shop-info>

      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad" ref="detailInfo"></detail-goods-info>

      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>

      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info> 
    
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>

      
    </scroll>
     <back-top v-show="isShow" @click.native="backClick"></back-top>
     <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {Swiper, SwiperItem} from "components/common/swiper"
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from "components/content/goods/GoodsList"
import BackTop from 'components/content/backTop/BackTop'


import detailNavItem from "views/detail/childComps/detailNavItem";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo"
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";

import DetailBottomBar from "views/detail/childComps/DetailBottomBar";


import {getDetailMultiData,getRecommentMultiData, Goods, Shop, GoodsParam} from "network/detail";
import {itemListenerMixin, backTopMixin} from 'common/mixin';
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  components: { 
    NavBar,
    Swiper, 
    SwiperItem,
    Scroll,
    GoodsList,
    BackTop,
    detailNavItem,
    DetailBaseInfo ,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    
    DetailBottomBar
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      iid:{
        type: String,
        default: ''
      },
      topImages:{
        type: Array,
        default(){
          return[]
        }
      },
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommendInfo:[],
      // imgItemLisener:null
      
      getScrollY:[],
      ScrollYS:null,
      currentIndex:0
    }
  },
  created() {
    this.iid = this.$route.params.iid
    
    //根据iid请求详情数据
      getDetailMultiData(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      
      //获取商品详情数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) 

      //获取商家信息
      this.shop = new Shop(data.shopInfo)

      //保存商品详情
      this.detailInfo = data.detailInfo

      //保存商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      this.ScrollYS = debounce(() => {
        this.getScrollY = []
        this.getScrollY.push(0)
        this.getScrollY.push(this.$refs.param.$el.offsetTop)
        this.getScrollY.push(this.$refs.comment.$el.offsetTop)
        this.getScrollY.push(this.$refs.recommend.$el.offsetTop)
        this.getScrollY.push(Number.MAX_VALUE)
        // console.log(this.getScrollY)
      })

      // 无法使用$el-1:这里虽然获取到了数据 但未渲染

      // 无法使用$el-3: 使用this.$nextTick(() => {})对应的DOM已经渲染出来
      // 但是图片依然没有加载完 获取的offsetTop有问题
      // this.$nextTick(() => {
      //   this.getScrollY = []
      //   this.getScrollY.push(0)
      //   this.getScrollY.push(this.$refs.param.$el.offsetTop)
      //   this.getScrollY.push(this.$refs.comment.$el.offsetTop)
      //   this.getScrollY.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.getScrollY)
      // })

      // 7.保存评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    // 推荐信息
      
    getRecommentMultiData().then(res => {
      this.recommendInfo = res.data.list;
      // console.log(res)
    })
  },
  mounted() {
    // 使用混入
    //  const refresh = debounce(this.$refs.scroll.refresh,100)
    // //监听图片加载
    // this.imgItemLisener = () => {
    //     const tabOffsetTop = refresh()
    //   }
    // this.$bus.$on('itemImgLoad',this.imgItemLisener)

    //无法使用$el-2：这里无法获得加了v-if的元素 因为当为false时dom还未被渲染 

    
  },
  // 因为Detail组件没做keep-alive 所以离开是destroy
  destroyed(){
    //撤销事件
    this.$bus.$off('itemImgLoad', this.imgItemLisener )
  },
  methods: {
    /**
     * 路由跳转
     */
    back(){
      this.$router.back()
    },
    detailImgLoad(){
      this.refresh()
      this.ScrollYS()
     
    },
    scrollShow(position){
      // console.log(postion)
      const positionY = -position.y
      this.isShow = positionY > 1000
      // console.log(this.getScrollY)
      for (let i = 0; i < this.getScrollY.length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.getScrollY[i] && positionY < this.getScrollY[i+1])) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
        
      }
     
    },
    detailNavClick(index){
      this.$refs.scroll.scrollTo(0,-this.getScrollY[index])
    },
    addToCart(){
      console.log('....')
      // 1获取购物车需要展示的信息
      const product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        iid: this.iid
      }
       // 2将信息保存到store对象中
      this.$store.commit('addCart', product)
    }
}
}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
.navbar{
  
}
  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
 .left{
  margin-top: 5px;
}
.detail-swiper{
  height: 300px;
} 

</style>