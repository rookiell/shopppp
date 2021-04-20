import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import home from "../components/home.vue"


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        name: 'login',
        // 此处注意，是component，不是components
        component: Login
    },
    {
        path: '/home',
        component: home
    }
]



const router = new VueRouter({
        routes
    })
    // 为routes挂载路由导航守卫，防止不经过登录直接输入url跳转到对应页面
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.path !== '/login') {
        const tokenStr = window.sessionStorage.getItem('token');
        if (!tokenStr) {
            return next("/login");
        } else {
            next()
        }
    } else {
        next();
    }
})

export default router