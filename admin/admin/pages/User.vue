<template>
    <div class="table-box">
        <!-- 添加用户dialog -->
        <el-button type="primary" style="margin-bottom: 24px;" @click="dialogFormVisible = true">
            添加用户
        </el-button>

        <el-dialog v-model="dialogFormVisible" title="添加用户">
            <el-form :model="addform">
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="addform.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="addform.password" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="createUser">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-table :data="users" style="width: 100%;">
            <el-table-column label="id">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号码">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="登录密码">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.password }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="openEditDialog(scope.row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-dialog v-model="dialogEditVisible" title="编辑用户">
                        <el-form :model="form">
                            <el-form-item label="手机号码" :label-width="formLabelWidth">
                                <el-input v-model="form.phone" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="登录密码" :label-width="formLabelWidth">
                                <el-input v-model="form.password" autocomplete="off" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogEditVisible = false">取消</el-button>
                                <el-button type="primary" @click="editUser">
                                    确认
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>

                    <el-button link type="primary" size="small" @click="deleteUser(scope.row)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { Delete, EditPen } from '@element-plus/icons-vue';
import { ref } from 'vue';
import user from './../models/user';
const users = ref([]);

const dialogFormVisible = ref(false)
const dialogEditVisible = ref(false)
const currentEditId = ref(null);
const formLabelWidth = '140px'
const form = ref({
    phone: '',
    password: '',
})
const addform = ref({
    phone: '',
    password: '',
})
const fetchUsers = async () => {
    try {
        const response = await user.getAllUsers();
        users.value = response.data.data;  //第一个data是axios的响应，第二个data是API数据
    } catch (e) {
        console.error(e);
    }
};
fetchUsers();


const createUser = async () => {
    const userData = {
        phone: addform.value.phone,
        password: addform.value.password
    };
    try {
        const response = await user.insertUsers(userData);
        if (response.data.code === 200) {
            const insertedId = response.data.data[0]
            const newUser = { id: insertedId, ...userData };
            users.value.push(newUser);
            dialogFormVisible.value = false;
            form.value = { phone: '', password: '' };
        } else {
            console.error(response.data.message);
        }

    } catch (e) {
        console.error(e);
    }
};
const deleteUser = async (selectedItem) => {
    let id = selectedItem.id
    try {
        const response = await user.deleteUsers(id);
        if (response.data.code === 200) {
            const index = users.value.findIndex(item => item.id === id);
            if (index !== -1) {
                users.value.splice(index, 1);  // 从数组中移除 
            }
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }
};

const openEditDialog = async (clickRow) => {
    currentEditId.value = clickRow.id;  // 保存当前编辑项的ID
    dialogEditVisible.value = true;  // 打开编辑对话框

    try {
        const response = await user.getSomeUsers(currentEditId.value);
        if (response.data.code === 200) {
            form.value.phone = response.data.data[0].phone;
            form.value.password = response.data.data[0].password;
            //form.value = { phone: '', password: '' };
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }


};

const editUser = async () => {
    const userData = {
        phone: form.value.phone,
        password: form.value.password
    };
    let id = currentEditId.value;
    try {
        const response = await user.editUsers(id, userData);
        if (response.data.code === 200) {
            let index = users.value.findIndex(item => item.id === id);
            const editItem = response.data.data[0]
            users.value[index] = { ...editItem };
            dialogEditVisible.value = false;
            form.value = { phone: '', password: '' };
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }
};
</script>

<style scoped lang="less">
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>