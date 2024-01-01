import request from "./request";

const user = {
    getAllUsers() {
        return request.get('/user');
    },
    getSomeUsers(id) {
        return request.get(`/user/${id}`);
    },
    insertUsers(userData) {
        return request.post('/api/user', userData);
    },
    editUsers(id, userData) {
        return request.put(`/api/user/${id}`, userData);
    },
    deleteUsers(id) {
        return request.delete(`/api/user/${id}`);
    }
}

export default user;