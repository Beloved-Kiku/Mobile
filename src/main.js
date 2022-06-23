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
        Vue.prototype.$Bus = this
    },
    render: h => h(App)
}).$mount('#app')