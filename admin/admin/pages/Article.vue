<template>
    <div class="table-box">
        <a href="/admin/article/create" style="margin-bottom: 24px;display: inline-block;"
            @click="$router.push('/admin/article/create')">新建文章</a>
        <el-table :data="articleData" style="width: 100%;">
            <el-table-column label="index">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.category }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="$router.push(`/admin/article/edit/${scope.row.id}`)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>编辑</span>
                    </el-button>
                    <el-button link type="primary" size="small" @click="deleteArticle(scope.row)">
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
import { ref } from 'vue';
import article from './../models/article';

const articleData = ref([]);
const fetchArticle = async () => {
    try {
        const response = await article.getAllArticles();
        if (response.data.code === 200) {
            articleData.value = response.data.data;
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }
}
fetchArticle();

const deleteArticle = async (selectedItem) => {
    let id = selectedItem.id;
    try {
        const response = await article.deleteArticle(id);
        if (response.data.code === 200) {
            let index = articleData.value.findIndex(item => item.id === id)
            articleData.value.splice(index, 1);
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
}




</script>

<style scoped lang="less"></style>