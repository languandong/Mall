<template>
  <div class="bottom-bar">
    <!--全选按钮-->
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <!--合计-->
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <!--去计算  -->
    <div class="caculate" @click="caClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    // 购物车中选中物品的总价格
    totalPrice() {
      // 通过检查checked属性过滤
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    // 购物车中选中物品的数量
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    //  购物车中是否全选的标识
    isSelectAll(){
      // 考虑购物车为空时，全选要取消
      if(this.cartList.length === 0) return false
      // 1.通过检查数组中每个元素的checked标识，获取checked为false的长度。取反意义即有长度即为false，即不全选
      // return !(this.cartList.filter(item => !item.checked).length)
      // 2.上面性能不高要遍历完，使用find函数找到某一个不选中即可返回false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    // 全选按钮的响应函数
    checkClick() {
      // 全部选中情况下 即把cartList中所有元素都设为false
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      //  没全部选中   即把cartList中所有元素设为true
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    // 去计算的响应函数 没选中商品时进行toast提醒
    caClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    font-size: 14px;

    background-color: #eeeeee;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 30px;
    flex: 1;
  }

  .caculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>