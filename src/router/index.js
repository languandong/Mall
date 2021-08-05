//1.引入
import Vue from "vue";
import VueRouter from "vue-router";
//懒加载views的页面
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
//2.安装插件
Vue.use(VueRouter)
//3 配置路由映射关系
const routes = [
  //默认路由
  {
    path:'',
    redirect:'/home'
  },
  //各个组件与路径的映射关系
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    // 接受外部传入的Id
    path:'/detail/:id',
    component:Detail
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

//向外暴露router，在Vue实例中引入
export default router