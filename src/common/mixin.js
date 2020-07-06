import {debounce} from 'common/utils'

export const itemListenerMixin = {
  data(){
    imgItemLisener:null
    refresh:null
  },
  mounted() {
     this.refresh = debounce(this.$refs.scroll.refresh,100)
    // //监听图片加载
    this.imgItemLisener = () => {
        const tabOffsetTop = this.refresh()
      }
    this.$bus.$on('itemImgLoad',this.imgItemLisener)
    console.log('mixin')
  }
}

export const backTopMixin = {
  data() {
    return {
      isShow:false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}