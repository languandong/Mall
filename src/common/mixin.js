import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

// 监听图片加载完成的混入对象
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    //  监听事件总线(图片加载）
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

// 返回顶部的混入对象（要在多个页面使用）
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}