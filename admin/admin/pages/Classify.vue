<template>
    <div class="table-box">
        <el-button type="primary" style="margin-bottom: 24px;" @click="dialogFormVisible = true">添加分类</el-button>
        <el-dialog v-model="dialogFormVisible" title="添加分类">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="createClassify">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-table :data="classifyData" style="width: 100%;">
            <el-table-column label="id">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类名称">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="dialogEditVisible = true">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>编辑</span>
                    </el-button>
                    <el-dialog v-model="dialogEditVisible" title="修改分类">
                        <el-form :model="form">
                            <el-form-item label="分类名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogEditVisible = false">取消</el-button>
                                <el-button type="primary" @click="editClassify(scope.row)">
                                    确认
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>

                    <el-button link type="primary" size="small" @click="deleteClassify(scope.row)">
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
import { Delete, EditPen } from '@element-plus/icons-vue';
import classify from './../models/classify';
const dialogFormVisible = ref(false);
const dialogEditVisible = ref(false);
const formLabelWidth = '140px';
const form = ref({
    name: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const classifyData = ref([]);
const fetchClassify = async () => {
    try {
        const response = await classify.getAllClassify();
        if (response.data.code === 200) {
            classifyData.value = response.data.data;
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
};
fetchClassify();
const createClassify = async () => {
    const classifyName = {
        name: form.value.name
    }
    try {
        const response = await classify.insertClassifyData(classifyName);
        if (response.data.code === 200) {
            classifyData.value.push(response.data.data);
            dialogFormVisible.value = false;
            form.value = { name: '' };
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
};
const editClassify = async (selectedItem) => {
    let id = selectedItem.id;
    const classifyName = {
        name: form.value.name
    }
    try {
        const response = await classify.editClassify(id, classifyName);
        if (response.data.code === 200) {
            let index = classifyData.value.findIndex(item => item.id === id);
            classifyData.value[index] = response.data.data;
            dialogEditVisible.value = false;
            form.value = { name: '' };
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
};
const deleteClassify = async (selectedItem) => {
    let id = selectedItem.id;
    try {
        const response = await classify.deleteClassify(id);
        if (response.data.code === 200) {
            let index = classifyData.value.findIndex(item => item.id === id);
            classifyData.value.splice(index,1);
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
};
</script>

<style scoped lang="less"></style>