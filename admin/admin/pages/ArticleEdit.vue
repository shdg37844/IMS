<template>
    <a href="/admin/article" style="margin-bottom: 24px;display: inline-block;">返回文章列表</a>
    <el-form :model="form" label-width="100px" style="max-width: 1000px">
        <el-form-item label="标题">
            <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="分类" prop="region">
            <el-select placeholder="请选择文章分类" v-model="form.category">
                <el-option v-for="item in classifyData" :label="item.name" :key="item.id" :value="item.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="内容">
            <div>
                <!-- 图片上传组件 -->
                <el-upload class="avatar-uploader" :action="serverUrl" :data="{ 'token': token }" name="file"
                    :headers="header" :show-file-list="false" :before-upload="beforeUpload" :on-success="uploadSuccess"
                    :on-error="uploadError">
                </el-upload>

                <!-- 富文本编辑器组件 -->
                <el-row v-loading="quillUpdateImg">
                    <quill-editor v-model:content="form.content" contentType="html" ref="myQuillEditor"
                        :options="editorOption" />
                </el-row>
            </div>
        </el-form-item>
        <el-button type="primary" style="margin:80px 0 0 900px;" @click="submitEdit">确认修改</el-button>
    </el-form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElUpload, ElRow, ElMessage } from 'element-plus';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import article from './../models/article';
import classify from './../models/classify';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'

const classifyData = ref([]);
const form = ref({
    id: '',
    title: '',
    category: null,
    content: '',
})
const route = useRoute();
const router = useRouter();

const fetchData = async () => {
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
}
fetchData();

const fetchContent = async () => {
    let id = route.params.id;
    try {
        const response = await article.getSomeArticles(id);
        const articles = response.data.data[0];
        if (response.data.code === 200) {
            form.value.id = articles.id;
            form.value.title = articles.title;
            form.value.category = articles.category;
            form.value.content = articles.content;
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }
}
fetchContent();

const submitEdit = async (selectedItem) => {
    let id = route.params.id;
    const articleContent = {
        title: form.value.title,
        category: form.value.category,
        content: form.value.content,
    }
    try {
        const response = await article.editArticle(id, articleContent);
        if (response.data.code === 200) {
            form.value = { title: '', category: null, content: '' };
            alert('修改成功');
            router.push('/admin/article')
        } else {
            console.error(response.data.message);
        }
    } catch (e) {
        console.error(e);
    }
};



// 定义响应式数据
const serverUrl = ref('https://upload-z2.qiniup.com'); // 服务器地址
const header = ref({}); // 请求头
const token = ref('');

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
                        document.querySelector('.avatar-uploader input').click()
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
            token.value = response.data.token;
            let uploadToken = token.value;
            //console.log('Token:', token.value);
        } else {
            console.error('获取失败', response);
        }
    } catch (error) {
        console.error('Error getting the upload token:', error);
        ElMessage.error('无法获取上传Token');
    }
};
onMounted(() => {
    getQiniuToken();  // 在组件挂载后获取token
});


// 方法定义
// 富文本图片上传前
const beforeUpload = (file) => {
    quillUpdateImg.value = true;   // 显示loading动画
    return true;
};

// 上传图片成功
const uploadSuccess = (res, file) => {
    let quill = myQuillEditor.value.getQuill();  // 获取富文本组件实例

    if (res.key) {
        let length = quill.getSelection(true).index;  // 获取光标所在位置
        let imageUrl = `http://s6dlgqfb9.hn-bkt.clouddn.com/${res.key}`;
        quill.insertEmbed(length, 'image', imageUrl);  // 插入图片  res.info为服务器返回的图片地址
        quill.setSelection(length + 1);  // 调整光标到最后

        form.value.content = quill.root.innerHTML;

    } else {
        ElMessage.error('图片插入失败');
    }
    quillUpdateImg.value = false;  // loading动画消失
};
// 上传图片失败
const uploadError = (err, file) => {
    console.error("Upload error triggered", err, file);
    console.error("Error response:", err.response);

    quillUpdateImg.value = false;  // loading动画消失
    ElMessage.error('图片插入失败');
};

</script>

<style scoped lang="less"></style>