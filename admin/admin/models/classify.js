import request from "./request";

const classify = {
    getAllClassify() {
        return request.get('/classify');
    },
    getSomeClassify(id) {
        return request.get(`/classify/${id}`);
    },
    insertClassifyData(classifyName) {
        return request.post('/api/classify', classifyName);
    },
    editClassify(id, classifyName) {
        return request.put(`/api/classify/${id}`, classifyName);
    },
    deleteClassify(id) {
        return request.delete(`/api/classify/${id}`);
    }
};

export default classify;