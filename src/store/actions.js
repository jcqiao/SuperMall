export default  {
  //异步 以及 复杂事件
  addCart(context,payload){
    // console.log('11111111')
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