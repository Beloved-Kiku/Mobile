import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    //解决路由Promise带来的错误

//引入路由组件
import Login from '@/views/Login'
import layout from '@/views/layout'
import Home from '@/views/layout/Home'
import User from '@/views/layout/User'
import Search from '@/views/layout/Search'
import ArtDeail from '@/views/layout/ArtDeail'
import SearchValue from '@/views/layout/SearchValue'
import user_edit from '@/views/layout/user_edit'
import chat from '@/views/layout/chat'
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
    }, {
        name: 'ArtDeail',
        path: '/ArtDeail/:id',
        component: ArtDeail,
    }, {
        name: 'user_edit',
        path: '/user_edit',
        component: user_edit
    },
    {
        name: 'chat',
        path: '/chat',
        component: chat
    }
]

const router = new VueRouter({
        routes
    })
    //路由前置守卫
    //后置路由守卫
router.afterEach(() => {
    window.scrollTo(0, 0);
})

export default router