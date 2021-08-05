<template>
  <div id="list">
    <div v-for="(item,index) in listData"
         :key="index"
         class="item">
      <!--图标-->
      <span class="icon">
        <svg :fill="item.iconColor">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <!--文字-->
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props:{
    listData: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  #list{
    background-color: #ffffff;
    font-size: 15px;
    color: #333333;
  }

  .item{
    height: 44px;
    line-height: 44px;
    position: relative;
  }
  .item .icon{
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }
  .icon svg{
    width: 18px;
    height: 18px;
  }
  .item .info{
    margin-left: 40px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    padding-left: 5px;
  }
  .item:last-of-type .info{
    border-bottom: none;
  }
</style>