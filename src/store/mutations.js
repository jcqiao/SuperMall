export default {
  incremtCount(state,payload){
    payload.count++
  },
  add(state,payload){
    payload.count = 1
    state.cartList.push(payload)
  }
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
 
}