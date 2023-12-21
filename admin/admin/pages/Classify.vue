<template>
    <div class="table-box">
        <el-button type="primary" style="margin-bottom: 24px;">添加分类</el-button>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="id">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类名称">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default>
                    <el-button link type="primary" size="small">
                        <el-icon><EditPen /></el-icon>
                        <span>编辑</span>
                    </el-button>
                    <el-button link type="primary" size="small">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        <span>删除</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { Delete, EditPen } from '@element-plus/icons-vue'
</script>

<style scoped lang="less"></style>