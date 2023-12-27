<template>
    <div class="page-body">
        <MainBar></MainBar>

        <div class="page-mainer">
            <div class="page-mainer-top">
                <el-button @click="logout">
                    <el-icon>
                        <Headset />
                    </el-icon>
                    <span>退出系统</span>
                </el-button>
            </div>
            <div class="page-mainer-bottom">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Headset } from '@element-plus/icons-vue';
import MainBar from './../src/components/MainBar.vue';
import router from './../src/router/index';
import auth from './../models/auth';

const logout = async () => {
    try {
        const response = await auth.AuthLogout();
        if (response.data.code === 200) {
            localStorage.removeItem('token');
            router.push('/admin/login');
        } else {
            console.error(response.data.data);
        }
    } catch (e) {
        console.error(e);
    }

}
</script>

<style scoped lang="less">
.page-body {
    display: flex;

    .page-mainer {
        flex: 1;

        .page-mainer-top {
            display: flex;
            justify-content: end;
            height: 80px;
            align-items: center;
            padding: 24px;
        }

        .page-mainer-bottom {
            padding: 24px;
            border-top: 1px solid var(--el-menu-border-color);
        }
    }
}
</style>