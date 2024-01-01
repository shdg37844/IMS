import Article from "../../pages/Article.vue";
import ArticleCreate from '../../pages/ArticleCreate.vue';
import ArticleEdit from '../../pages/ArticleEdit.vue';
import Classify from '../../pages/Classify.vue';
import Login from '../../pages/Login.vue';
import User from '../../pages/User.vue';
import ManageLayout from '../../pages/ManageLayout.vue';

const routes = [
    {
        path: "/admin/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/admin",
        name: "manage",
        component: ManageLayout,
        redirect: '/admin/user',
        meta: {
            requireAuth: true // 需要登录才能访问
        },
        children: [
            {
                path: "user",
                name: "user",
                component: User,
                meta: {
                    requireAuth: true 
                }
            },
            {
                path: "classify",
                name: "classify",
                component: Classify,
                meta: {
                    requireAuth: true 
                }
            },
            {
                path: "article",
                name: "article",
                component: Article,
                meta: {
                    requireAuth: true 
                }
            },
            {
                path: "article/create",
                name: "create",
                component: ArticleCreate,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "article/edit/:id",
                name: "edit",
                component: ArticleEdit,
                meta: {
                    requireAuth: true
                }
            },
        ]
    },



];

export default routes