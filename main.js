
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
Vue.prototype.$store = store
//导入第三方包
import { $http } from '@escook/request-miniprogram'  //用来发起网络请求
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net/api/public/v1'
//请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}
//封装数据请求失败的方法
uni.$showMsg = function(title='数据加载失败',duration = 2000) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif