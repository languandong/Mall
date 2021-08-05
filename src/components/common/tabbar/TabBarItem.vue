<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--    根据激活路由情况设定要显示的图片-->
    <div v-if="!isActive" >
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <!--    根据激活路由情况设定文字样式-->
    <!--    新增需求：还要由外部决定激活的样式-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      //接受父组件传递进来的路由地址
      props:{
        path:String,
        activeColor: {
          type:String,
          default:'red'
        }
      },
      computed:{
        //通过父传子的跳转路由路径和当前激活的路由路径判断样式是不是要激活
        isActive(){
          //当前路由路径是否包含激活路径
          //如果要检索的字符串值没有出现，则该方法返回 -1。
          return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle(){
          //三目运算符
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods:{
        itemClick(){
          //代码跳转路由
          this.$router.push(this.path).catch(err=>{})
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    /*让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容*/
    flex: 1;
    /*垂直对齐文本*/
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  /*可以给插槽未指定的img预留样式*/
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    /*  基线对准。去掉img下方的3个像素*/
    vertical-align: middle;
  }

</style>