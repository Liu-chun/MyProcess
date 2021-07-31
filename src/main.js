import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自适应
import 'lib-flexible/flexible'
import './api/xhook'
// qs
import qs from 'qs'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入样式
import './assets/styles/reset.css'
import './assets/styles/public.css'
import './assets/styles/border.css'
// 引入 mui
import Mui from 'vue-awesome-mui'

Vue.config.productionTip = false
Vue.prototype.$qs = qs;

Vue.use(Mui)
Vue.use(Vant);
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 解决手机端物理返回键直接返回桌面的问题
// 此代码是采用的 5+ Runtime中的plus对象
// document.addEventListener('plusready', function () {
//   var webview = window.plus.webview.currentWebview()
//   window.plus.key.addEventListener('backbutton', function () {
//     webview.canBack(function (e) {
//       if (e.canBack) {
//         webview.back()
//       } else {
//         // webview.close(); //hide,quit
//         // plus.runtime.quit();
//         // 首页返回键处理
//         // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
//         var first = null
//         window.plus.key.addEventListener('backbutton', function () {
//           // 首次按键，提示‘再按一次退出应用’
//           if (!first) {
//             first = new Date().getTime()
//             setTimeout(function () {
//               first = null
//             }, 1000)
//           } else {
//             if (new Date().getTime() - first < 1500) {
//               window.plus.runtime.quit()
//             }
//           }
//         }, false)
//       }
//     })
//   })
// })