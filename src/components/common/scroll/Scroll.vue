<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return{
      // scroll对象
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      ObserveDom: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动位置
    this.scroll.on('scroll', (position) => {
      //向外把position发送出去
      this.$emit('scroll', position)
    })
    // 监听上拉事件
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多')
      this.$emit('pullingUp')
    })

  },
  methods:{
    // 跳转方法
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 完成上拉
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    // 刷新
    refresh(){
      console.log('refresh刷新')
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>