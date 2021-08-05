<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    // 照片保存的标签不统一
    showImage(){
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImgLoad')
    },
    itemClick(){
      console.log('跳转到详情页');
      //this.goodsItem是首页请求来的数据,里面包括特定商品的iid属性
      //先跳转后请求数据
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  /* 整个item */
  .goods-item{
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  /* 图片样式 */
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  /*整个大的信息栏*/
  .goods-info{
    font-size: 12px;
    text-align: center;
    /*定位到图片下方*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /*标题*/
  .goods-info p{
    overflow: hidden;
    /*隐藏过多的文字*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 3px;
  }
  /* 价格 */
  .goods-info .price{
    color:var(--color-high-text);
    margin-right: 20px;
  }
  /* 收藏*/
  .collect{
    position: relative;
  }
  /* 收藏图标*/
  .collect::before{
    content: '';
    /*设置背景的偏移量*/
    position: absolute;
    top: -1px;
    left: -15px;
    /*背景星标*/
    background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
    height: 14px;
    width: 14px;
  }

</style>