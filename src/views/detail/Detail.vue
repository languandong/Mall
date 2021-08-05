<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @itemClick="itemClick"
                    ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!--轮播图-->
      <detail-swiper :top-images="topImages"/>
      <!--goods数据展示-->
      <detail-base-info :goods="goods"/>
      <!--shop数据展示-->
      <detail-shop-info :shop="shop"/>
      <!--detailInfo数据展示-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!--paramInfo数据展示-->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!--comment-info数据展示-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!--recommends推荐商品数据展示-->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <!--底部导航栏-->
    <detail-bottom-bar @addToCart="addToCart"/>
    <!--返回顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "@/network/detail";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      // 保存特定id对应的商品数据
      id:null,
      // 商品数据
      topImages:[],
      goods: {},
      shop:{},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // 记录各个部分跳转的坐标
      themeTopYs:[],
      // 防抖封装的获取函数
      getThemeTopY:null,
      // 记录滚动位置所处的部分区间
      currentIndex:0
    }
  },
  //发送网络请求
  created() {
    //获取当前页面对应的id
    this.id = this.$route.params.id
    //根据id请求数据
    getDetail(this.id).then(res => {
      console.log(res)
      const data = res.data.result
      //  1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      //  2、创建商品信息对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //  3、创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      //  4、保存商品的详情数据
      this.detailInfo = data.detailInfo
      //  5. 保存商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  6. 取出评论信息
      if(data.rate.CRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    // 请求推荐的数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })
    // 防抖函数封装的位置记录函数，不会频繁的更新
    this.getThemeTopY = debounce(() => {
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      // 图片加载一次 刷新一次 获取一次位置
      this.newRefresh()
      this.getThemeTopY()
    },
    contentScroll(position){
      // 获取滚动时的位置
      const positionY = -position.y
      // 判断正处于哪个部分
      let length = this.themeTopYs.length
      for(let i=0;i<length;i++){
        //当前index不是i 且位置在某个区间
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    itemClick(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.id

      this.addCart(product).then(res => {
        this.$toast.show(res,1500)
      })
    }
  },
  destroyed() {
    this.$bus.$off('imageLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
/**/
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/*给顶部导航栏设置层级*/
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/*给滚动区域设置高度*/
.content{
  background-color: #fff;
  height: calc(100% - 44px - 51px);
}
</style>