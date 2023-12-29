<template>
    <a href="" style="margin-bottom: 24px;display: inline-block;" @click="$router.push('/admin/article')">返回文章列表</a>
    <el-form label-width="100px" style="max-width: 10 
    00px">
        <el-form-item label="标题">
            <el-input v-model="titleContent" />
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
            <div ref="editor"></div>

            <div>
                <!-- 图片上传组件 -->
                <el-upload class="avatar-uploader" :action="serverUrl" name="img" :headers="header" :show-file-list="false"
                    :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
                </el-upload>

                <!-- 富文本编辑器组件 -->
                <el-row v-loading="quillUpdateImg">
                    <QuillEditor v-model="detailContent" ref="myQuillEditor" :options="editorOption"  />
                </el-row>
            </div>
            <input type="file" id="fileInput" style="display: none" accept="image/*" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue';
import { ElUpload, ElRow, ElMessage } from 'element-plus';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import article from './../models/article';

const titleContent = ref('');

// 定义响应式数据
const serverUrl = ref('https://upload-z2.qiniup.com'); // 服务器地址
const header = ref({}); // 请求头
const detailContent = ref(''); // 富文本内容

// 定义响应式变量
const quillUpdateImg = ref(false); // 控制加载动画
const myQuillEditor = ref(null);  // 引用富文本编辑器的实例

// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
]

// 定义富文本编辑器配置
const editorOption = ref({
    placeholder: '',
    theme: 'snow',
    modules: {
        toolbar: {
            container: toolbarOptions,  // 工具栏
            handlers: {
                'image': function (value) {
                    if (value) {
                        document.querySelector('#fileInput').click();
                    } else {
                        myQuillEditor.value.getQuill().format('image', false);
                    }
                }
            }
        }
    }
});

// 获取七牛云上传Token
const getQiniuToken = async () => {
    try {
        const response = await article.getQiniuToken();
        if (response.data && response.data.token) {
            header.value = { 'Authorization': 'UpToken ' + response.data.token };
        } else {
            console.error('获取失败', response);
        }
    } catch (error) {
        console.error('Error getting the upload token:', error);
        ElMessage.error('无法获取上传Token');
    }
};
getQiniuToken();

// 方法定义
// 富文本图片上传前
const beforeUpload = () => {
    quillUpdateImg.value = true;   // 显示loading动画
};

// 上传图片成功
const uploadSuccess = (res, file) => {
    let quill = myQuillEditor.value.getQuill();  // 获取富文本组件实例
    // 如果上传成功
    if (res.status === 200 && res.info !== null) {
        let length = quill.getSelection(true).index;  // 获取光标所在位置
        quill.insertEmbed(length, 'image', res.info);  // 插入图片  res.info为服务器返回的图片地址
        quill.setSelection(length + 1);  // 调整光标到最后
    } else {
        ElMessage.error('图片插入失败');
    }
    quillUpdateImg.value = false;  // loading动画消失
};
// 上传图片失败
const uploadError = () => {
    quillUpdateImg.value = false;  // loading动画消失
    ElMessage.error('图片插入失败');
};

</script>

<style scoped lang="less">

</style>