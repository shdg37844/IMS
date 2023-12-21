<template>
    <div class="table-box">
        <a href="" style="margin-bottom: 24px;display: inline-block;">新建文章</a>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="index">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default>
                    <el-button link type="primary" size="small">
                        <el-icon>
                            <EditPen />
                        </el-icon>
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
</script>

<style scoped lang="less"></style>