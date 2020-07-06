import Vue from 'vue'
import Vuex from 'vuex'

//1 安装插件
Vue.use(Vuex)


//2 创建Store对象
const store = new Vuex.Store(
  {
    state: {
      cartList:[]
     },
     mutations: {
       //mutations 唯一目的就是修改state中的状态
       //mutations 中每个方法尽可能单一 方便跟踪状态
      // addCart(state, payload){
      //   let oldProduct = null
      //   oldProduct = state.cartList.find(item => {
      //     return item.iid === payload.iid
      //   })
      //   if (oldProduct) {
      //     payload.count += 1 做了一件事
      //   }else{
      //     payload.count = 1
      //     state.cartList.push(payload) 做了一件事
      //   }
      // }
      incremtCount(state,payload){
        payload.count++
      },
      add(state,payload){
        payload.count = 1
        state.cartList.push(payload)
      }
     },
     actions: {
       //异步 以及 复杂事件
       addCart(context,payload){
         console.log('11111111')
         let oldProduct = null
         oldProduct = context.state.cartList.find(item => {
           return item.iid === payload.iid
         })

         if (oldProduct) {
          context.commit('incremtCount', oldProduct)
         }else {
          context.commit('add', payload)
        }
       }
     }
   }
)

//3 挂载到Vue实例上
export default store