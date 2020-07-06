<template>
  <div class="tab-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="isColored"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabItem',
  props:{
    p:String,
    isColor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return {
     
    }
  },
  computed:{
    isActive(){
      // return this.$route.path === this.path ? true : false;
      return this.$route.path.indexOf(this.p) !== -1
    },
    isColored(){
      // console.log(this.p)
      // console.log(this.$route)
      // console.log(this.isColor);
        return this.isActive? {color: this.isColor} : {};
      }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.p)
    }
  }
}
</script>

<style scoped>
  .tab-item{
    flex: 1;
    text-align: center;
    bottom: 0;
    height: 49px;
  }
  .tab-item img {
    height: 24px;
    width: 24px;
    vertical-align: middle;
  }
</style>