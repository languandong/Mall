<template>
  <div id="shop-item">
    <!--选中按钮-->
    <div class="item-selector">
      <CheckButton :is-checked="product"
                   @click.native="checkClick"/>
    </div>
    <!--商品图片-->
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <!--商品数据-->
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述:{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components:{
    CheckButton
  },
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    //点击选中功能
    checkClick(){
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
/*√*/
.item-selector {
  width: 14%;
  /*布局内部的图片*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/*图片*/
.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
/*文字*/
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.item-title, .item-desc {
  /*对文字样式的设置*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>