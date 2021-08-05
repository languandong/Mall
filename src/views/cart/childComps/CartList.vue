<template>
  <div class="cart-list">

    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item v-for="(item,index) in cartList"
                        :product="item"
                        :key="index"/>
      </div>

    </scroll>

  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";

import Scroll from "@/components/common/scroll/Scroll";

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    // 进入购物车界面时刷新一次，重新计算高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  /*  设置一个刚好中间的高度*/
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  /* content继承父组件的高度*/
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>