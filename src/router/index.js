import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    //解决路由Promise带来的错误
const Catch_push = VueRouter.prototype.push
const Catch_replace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
    return Catch_push.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            Catch_replace.call(this, location, resolve, reject)
        } else {
            Catch_replace.call(this, () => {}, () => {})
        }
    }
    //引入路由组件
import Login from '@/views/Login'
import layout from '@/views/layout'
import Home from '@/views/layout/Home'
import User from '@/views/layout/User'
import Search from '@/views/layout/Search'
import SearchValue from '@/views/layout/SearchValue'
const routes = [{
        //路由重定向
        path: '/',
        redirect: '/Login',
    },
    {
        path: '/layout',
        redirect: '/layout/Home',
        component: layout,
        children: [{
            name: 'Home',
            path: 'Home',
            component: Home
        }, {
            name: 'User',
            path: 'User',
            component: User
        }]
    }, {
        name: 'Login',
        path: '/Login',
        component: Login
    }, {
        name: 'Search',
        path: '/Search',
        component: Search
    }, {
        name: 'SearchValue',
        path: '/SearchValue',
        component: SearchValue
    }
]

const router = new VueRouter({
    routes
})
router.afterEach(() => {
    window.scrollTo(0, 0);
})
export default router