<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods"
                     :goods-item="item"
                     :key="index"/>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  export default {
    themeTopYsname: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
/*设置布局*/
  .goods{
    display: flex;
    /*设置换行*/
    flex-wrap: wrap;
    /* 均等分 */
    justify-content: space-around;
  }
</style>