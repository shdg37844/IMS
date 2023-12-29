import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('token')
    if (to.meta.requireAuth) { // 判断路由是否需要登录控制
        if (isLogin) { // 如果已经登录，则继续访问
            next()
        } else { // 如果未登录，则跳转到登录页面
            next({
                path: '/admin/login',
                query: { redirect: to.fullPath } // 将当前路由地址作为参数传递给登录页面，以便登录后跳转回来
            })
        }
    } else { // 不需要登录控制
        if (isLogin && to.path === '/admin/login') { //如果已经登录并且目标是登录页面
            next('admin/article');   //则重定向到文章管理页面
        } else {
            next();
        }
    }
});

app.use(router);
app.use(ElementPlus);
app.mount('#app');
