<template>
  <div class="goods-info">
    <div class="top">
      <div class="desc">{{detailInfo.desc}}</div>
      
    </div>

    <div class="bottom" v-for="item in detailInfo.detailImage">
        <div class="key">{{item.key}}</div>
        <img v-for="img in item.list" :src="img" alt="" @load="detailImgLoad">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props:{
    detailInfo: {}
  },
  created() {
    // console.log(this.detailInfo)
  },
  methods:{
    detailImgLoad(){
      this.$emit('detailImgLoad')
    }
  }

}
</script>

<style scoped>
.goods-info{
  padding: 30px 10px;
  position: relative;
}
.top{
  padding: 30px 10px;
}
.top::before{
  content: '';
  position: absolute;  
  left: 10px;
  top: 10px;
  bottom: auto;
  right: auto;
  width: 40%;
  height: 7px;
  background-color: bisque;
}
.top::after{
  content: '';
  position: absolute;
  right: 10px;
  top: 180px;
  left: auto;
  bottom: auto;
  width: 40%;
  height: 7px;
  background-color: bisque;
}
.top .desc{
  padding: 15px 0;
  font-size: 14px;
}
.top .key{
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.bottom{
  margin-top: 30px;
}
.bottom img{
 width: 100%;
}
</style>