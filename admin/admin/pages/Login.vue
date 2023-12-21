<template>
    <div class="login-box">
        <div class="login-form">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model.number="ruleForm.phone" />
                </el-form-item>
                <el-form-item label="登录密码" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const ruleFormRef = ref(null);
const ruleForm = reactive({
    pass: '',
    phone: '',
})

const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入手机号码'))
    }
    callback();
}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入登录密码'))
    } else {
        callback();
    }
}

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    phone: [{ validator: checkPhone, trigger: 'blur' }],
})

const submitForm = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            console.log('登录成功!')
        } else {
            console.log('登录失败!')
            return false
        }
    })
}
</script>

<style scoped lang="less">
.login-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .login-form {
        width: 400px;
    }
}
</style>