import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入二次封装的axios 
import '@/request/request'
//引入移动端适配插件库
import 'amfe-flexible'
//引入Vant UI 组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    beforeCreate() {
        //挂载全局事件总线 子组件间通信
        Vue.prototype.$EventBus = this
    },
    render: h => h(App)
}).$mount('#app')