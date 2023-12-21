<template>
    <div>
        <div
            style="height:81px;border-bottom: 1px solid var(--el-menu-border-color);border-right: 1px solid var(--el-menu-border-color);">
        </div>
        <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
                <el-icon>
                    <Calendar />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <Calendar />
                </el-icon>
                <span>分类管理</span>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">文章列表</el-menu-item>
                    <el-menu-item index="3-2">新建文章</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

        </el-menu>
    </div>
</template>

<script setup>
import { Calendar, Setting, } from '@element-plus/icons-vue'
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
    width: 300px;
    height: 100vh;
}
</style>