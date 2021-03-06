import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context, payload){
    return new Promise((resolve,reject) => {
      // 检查商品是否已经加入购物车 有则数量加1 无则添加
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        context.commit(ADD_COUNTER,payload)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}