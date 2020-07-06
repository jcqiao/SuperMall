import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//这样在GoodsListItem中的$bus可以使用$emit
Vue.prototype.$bus = new Vue()

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
