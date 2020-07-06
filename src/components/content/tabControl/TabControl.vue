<template>
  <div class="tab-control">
    <div class="tab-control-item" @click="itemClick(index)" v-for="(item,index) in titles">
      <span :class="{active: index === currentIndex}">{{item}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  mounted(){
   
      // console.log(document.querySelector('.tab-control').offsetTop)
    
  },
  methods:{
    itemClick(index){
      // console.log(index)
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control{
    width: 100%;
    height: 44px;
    display: flex;
    text-align: center;
    line-height: 44px;
  }
  .tab-control-item{
    flex: 1;
    font-size: 18px;
  }
  .tab-control-item span{
    padding: 8px;
  }
  .active{
    color: var(--color-high-text);
    border-bottom: 1px solid var(--color-tint);
  }
</style>