<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table  v-for="(table, index) in paramInfo.sizes"
     class="info-size" :key="index">
      <tr v-for="(tr, indextr) in table" :key="indextr">
        <td v-for="(td, indextd) in tr" :key="indextd">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="item in paramInfo.infos">
        <td class="key">{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailParamInfo",
  props:{
    paramInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info{
   padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    
}
  table{
    width: 100%;
    line-height: 40px;
    border-collapse: collapse;
    margin-top: 50px
  }
  table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param .key{
    width: 75px;
  }
  
</style>