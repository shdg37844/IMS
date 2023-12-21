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
        children: [
            {
                path: "user",
                name: "user",
                component: User,
            },
            {
                path: "classify",
                name: "classify",
                component: Classify,
            },
            {
                path: "article",
                name: "article",
                component: Article,
            },
            {
                path: "article/create",
                name: "create",
                component: ArticleCreate,
            },
            {
                path: "article/edit",
                name: "edit",
                component: ArticleEdit,
            },
        ]
    },



];

export default routes