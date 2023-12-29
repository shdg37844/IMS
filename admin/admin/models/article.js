import request from './request';

const article = {
    getQiniuToken() {
        return request.get('/qiniu-uploadtoken', { withCredentials: true });
    }

};

export default article;