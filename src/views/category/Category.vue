<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <!--左侧菜单-->
      <tab-menu :categories='categories'
                @selectItem="selectItem"/>
      <!--内容滚动区-->
      <scroll id="tab-content" :data="[categoryData]">
          <!--各类别数据-->
          <tab-content-category :subcategories="showSubcategory"/>
          <!--可控导航栏-->
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"/>
          <!--对应商品内容展示-->
          <tab-content-detail :category-detail="showCategoryDetail"/>
      </scroll>
    </div>

  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "views/category/childComps/TabMenu";
import TabControl from "components/content/TabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "views/category/childComps/TabContentCategory";
import TabContentDetail from "views/category/childComps/TabContentDetail";

import {getCategory,getSubcategory,getCategoryDetail} from "network/category";

export default {
  name: "Category",
  components:{
    NavBar,
    TabMenu,
    TabControl,
    TabContentCategory,
    TabContentDetail,
    Scroll
  },
  data(){
    return{
      //菜单的类别
      categories:[],
      //每个类别的项目
      categoryData:{},
      //当前正展示的类别
      currentIndex:-1,
      // 记录商品显示的类型
      currentType:'pop',
      // 控制TabControl的显示
      isTabFixed:false,
      // tabControl的偏移量
      tabOffsetTop:0
    }
  },
  created() {
    this._getCategory()
  },
  methods:{
    //网络请求
    //请求类别数据
    _getCategory(){
      getCategory().then(res => {
        //获取分类数据
        this.categories = res.data.data.category.list
        // 初始化每个类别的数据
        for(let i=0; i<this.categories.length; i++){
          this.categoryData[i] = {
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        // 请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    //请求对应类别数据
    _getSubcategories(index){
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    //响应函数
    //菜单点击函数，请求相应数据
    selectItem(index){
      this._getSubcategories(index)
    },
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
          break
      }
    }
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex === -1)
        return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType].data
    }
  }
}
</script>

<style scoped>
  #category{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #ffffff;

  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    overflow: hidden;
  }
  #tab-content{
    flex: 1;
    height: 100%;
  }
</style>