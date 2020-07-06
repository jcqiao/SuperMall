<template>
  <div class="detailNavItem">
    <div v-for="(item, index) in detailItem" @click="itemClick(index)">
      <span :class="{active: index === currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailNavItem',
  props:{
    detailItem:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: { 
    itemClick(index){
      this.currentIndex = index
      this.$emit('detailNavClick',index)
    } 
  }
}
</script>

<style scoped>
  .detailNavItem{
    display: flex;
    line-height: 44px;
  }

  .detailNavItem div{
    flex: 1;
    
  }
  .active{
    color: var(--color-high-text);
  }

</style>