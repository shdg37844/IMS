<template>
    <a href="" style="margin-bottom: 24px;display: inline-block;">返回文章列表</a>
    <el-form label-width="100px" style="max-width: 10 
    00px">
        <el-form-item label="标题">
            <el-input />
        </el-form-item>
        <el-form-item label="分类" prop="region">
            <el-select placeholder="">
                <el-option label="技术动态" value="技术动态" />
                <el-option label="极客新闻" value="极客新闻" />
                <el-option label="通知公告" value="通知公告" />
                <el-option label="技术热点" value="技术热点" />
                <el-option label="新课列表" value="新课列表" />
            </el-select>
        </el-form-item>
        <el-form-item label="内容">
            <el-input />
        </el-form-item>
    </el-form>
</template>

<script setup>
</script>

<style scoped lang="less"></style>