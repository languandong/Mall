<template>
  <div id="home">
    <!--顶部导航栏-->
    <nav-bar class="home-nav" >
      <div slot="center">购物街</div>
    </nav-bar>

    <!--解决吸顶问题-->
    <tab-control class="tab-control"
                 @tabClick="tabClick"
                 ref="TabControl1"
                 :titles="['流行','新款','精选']"
                 v-show="isTabFixed"/>

    <!--滚动区域-->
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐块-->
      <home-recommend-view :recommends="recommends"/>
      <!--特征块-->
      <feature-view/>
      <!--可控导航栏-->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="TabControl2"/>
      <!--商品展示-->
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <!--返回顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      //保存商品数据的数据结构
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      // 当前展示数据的类型
      currentType:'pop',
      // 控制BackTop组件显示的标识
      isShowBackTop: false,
      // 控制TabControl的显示
      isTabFixed:false,
      // tabControl的偏移量
      tabOffsetTop:0,
      // 记录离开时的偏移量
      saveY: 0
    }
  },
  methods:{
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      //让两个tabControl保持一致   设置子组件的currentIndex,决定激活效果一致
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    swiperImageLoad(){
      //记录tabControl2的偏移量
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
    },
    //网络请求的方法
    getHomeMultidata(){
      //获取到网络请求的promise
      getHomeMultidata().then(res => {
        //保存数据
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type){
      // 获取要请求数据的page
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        // 更新page.给下一次数据请求准备
        this.goods[type].page += 1
      })
    }
  },
  //created阶段发送网络请求
  created() {
    console.log('home created')
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.y
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
  /*滚动内容*/
  .content{
    height: calc(100% - 93px);
    /*高度为719怎么来的 */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 99;
  }
</style>