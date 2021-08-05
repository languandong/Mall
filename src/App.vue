<template>
  <div class="app">
    <!--展示路由跳转的相关内容-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <!--底部导航  -->
    <main-tab-bar></main-tab-bar>

    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar";
import Icon from "components/content/Icon/Icon";
import SvgIcon from "components/content/Icon/svg";
export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>
<style>
  @import "assets/css/base.css";
</style>
