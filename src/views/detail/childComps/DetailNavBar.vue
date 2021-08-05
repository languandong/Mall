<template>
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~@/assets/img/common/back.svg" alt="">
    </div>

    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active:index==currentIndex}"
           @click="itemClick(index)">{{item}}</div>
    </div>
  </NavBar>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      components:{
        NavBar
      },
      data(){
        return {
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index
          //  发送给父组件
          this.$emit('itemClick',index)
        },
        backClick(){
          //返回上一页
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  /*均等分*/
  .title-item{
    flex: 1
  }
  .active{
    color:var(--color-high-text)
  }

  .back img{
    margin-top: 10px;
  }
</style>