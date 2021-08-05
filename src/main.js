import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import VueLazyload from "vue-lazyload";
import FastClick from 'fastclick'
//定义事件总线
Vue.prototype.$bus = new Vue()
//安装插件
Vue.use(toast)
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)

//Vue实例
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
