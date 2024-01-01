import request from './request';

const article = {
    getQiniuToken() {
        return request.get('/qiniu-uploadtoken', { withCredentials: true });
    },
    getAllArticles() {
        return request.get('/article', { withCredentials: true });
    },
    getSomeArticles(id) {
        return request.get(`/article/${id}`, { withCredentials: true });
    },
    insertArticle(articleContent) {
        return request.post('/api/article', articleContent);
    },
    deleteArticle(id) {
        return request.delete(`/api/article/${id}`);
    },
    editArticle(id, articleContent) {
        return request.put(`/api/article/${id}`, articleContent);
    }
};

export default article;