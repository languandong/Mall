<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 会自动寻找到所在文件夹中index.js
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad:false
    }
  },
  props:{
    //接收外部传入的数据
    banners:{
      type: Array,
      default(){
        return [];
      }
    },
    recommends:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    imageLoad(){
      // 只在第一次img完成加载后响应即可
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>