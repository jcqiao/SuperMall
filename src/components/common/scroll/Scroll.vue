<template>
<!-- ref/chidren -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data(){
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  }
  ,
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    })
    //实时监听滚动 便于做回到顶部的隐藏和显示
    this.scroll.on('scroll', (position) => {
      // console.log(position); //不需要在这里监听 要在home监听
      this.$emit('scroll',position)
    })

    //上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      // home做请求不在这里 
      // 子传父
      this.$emit('pullingUp')
    })
    }
  },
  methods:{
    
     scrollTo(x, y, time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      // console.log('------')
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>