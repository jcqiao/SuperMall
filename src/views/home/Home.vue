<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <tab-control v-show="posfixed" class="tabFixed" :titles="['热门','精选','喜欢']" @tabClick="tabClick" ref="topcontentTab"></tab-control>  
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    :pull-up-load="true" 
    @scroll="scrollShow" 
    @pullingUp="pullingUp"> 
      <home-swiper ref="hSwiper" :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends" ></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['热门','精选','喜欢']" @tabClick="tabClick" ref="contentTab"></tab-control>  
      <goods-list :goods='gooditems'></goods-list>
    </scroll>
    
    <!-- 监听组件必须加.native修饰符 -->
    <back-top v-show="isShow" @click.native="backClick" ></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata,getGoodsMultidata} from "network/home";
  import {debounce} from 'common/utils';

  import scroll from 'components/common/scroll/Scroll';
  
  import {itemListenerMixin} from 'common/mixin';

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
      scroll
    },
    computed:{
      gooditems(){
        return this.goods[this.currentGoodsType].list
      }
    }
    ,
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currentGoodsType: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        posfixed: false,
        currentScrollY: 0,
        // imgItemLisener: null
      }
    },
    created() {
      // 1.请求轮播等数据
      this._getMultiData()

      // 2.请求首页数据
      this._getGoodsMultiData('pop')
      this._getGoodsMultiData('new')
      this._getGoodsMultiData('sell')
    },
    mixins:[itemListenerMixin],
    mounted(){
      //以下使用mixins
      // const refresh = debounce(this.$refs.scroll.refresh,100)
       //为的是this.$refs.scroll能拿到
      //监听goodsItemImgs是否加载完
      // this.imgItemLisener = () => {
        // console.log('111111')
        // console.log(this.$refs.contentTab.$el.offsetTop)
        // const tabOffsetTop = refresh()
        // this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;
      // }
      // this.$bus.$on('itemImgLoad', this.imgItemLisener)
     
      // this.$bus.$emit('gethomeY',this.currentScrollY)
    },
    
    activated(){
      // console.log('home activiated')
      // this.$refs.scroll.scrollTo(0, this.currentScrollY, 0)
      this.$refs.scroll.refresh() 
      this.$refs.scroll.scrollTo(0, this.currentScrollY, 0)
      
      
    },
    deactivated(){
      // console.log('home de')
      this.currentScrollY = this.$refs.scroll.getScrollY()
      // console.log(this.currentScrollY)
      //移除监听器 中的 某个函数
      this.$bus.$off('itemImgLoad', this.imgItemLisener)
    },
    destroyed(){
      console.log('destroy')
      
    }
    ,
    methods:{
      // /**
      //  * 防抖函数
      //  */
      // 放到公共组件
      // debounce(func, delay=300){
      //   let timer = null
      //   // console.log('debounce '+timer)
      //   return function (...args) {
      //     if (timer) {
      //       // console.log('if ' + timer)
      //       clearTimeout(timer)
      //     }
      //     timer = setTimeout(()=>{
            
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // },
      /**
       * 事件监听
       * @name tabClick
       * @parmas index
       */
      tabClick(index){
        console.log(index)
        switch (index) {
          case 0:
            this.currentGoodsType = 'pop'
            break;
          case 1:
            this.currentGoodsType = 'new'
            break;
          case 2:
            this.currentGoodsType = 'sell'
          break;
        }
        this.$refs.topcontentTab.currentIndex = index
        this.$refs.contentTab.currentIndex = index
      },
      backClick(){
        //this.$refs.scroll拿到scroll组件
        this.$refs.scroll.scrollTo(0,0,500)
      },
      /**
       * 返回顶部图标超过1000时显示
       */
      scrollShow(position){
        // console.log(position)
        this.isShow = -position.y > 1000

        this.posfixed = -position.y >= this.tabOffsetTop 
      },
      /**
       * 上拉加载更多
       */
      pullingUp(){
        // console.log('上拉加载更多')
        // console.log(this.goods['pop'].page)
        this._getGoodsMultiData(this.currentGoodsType)
        //scroll这里只能完成一次上拉加载 因此每次都要finishPullUp
        this.$refs.scroll.finishPullUp()
      },
      //监听轮播图是否加载完
      swiperLoaded(){
        // console.log(this.$refs.contentTab.$el.offsetTop)
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;
      }
      ,
       /**
       * 网络请求
       */
      _getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      _getGoodsMultiData(type) {
        const page = this.goods[type].page + 1
        getGoodsMultidata(type,page).then(res => {
          console.log(res)
          // console.log(res.data.list);
          // console.log(...res.data.list)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // console.log(this.goods[type].list)
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* vh:视口高度 */
    height: 100vh;
    position: relative;
    /* padding-top: 40px; 原生滚动 */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 原生滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tabFixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 43px;
    background: #fff;
    z-index: 9;
  }
  .content {
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* height: calc(100% - 50px);
    overflow: hidden; */
  }

</style>
