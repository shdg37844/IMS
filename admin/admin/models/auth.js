import request from './request';

const auth = {
    AuthLogin(authData) {
        return request.post('/api/login', authData, {
            withCredentials: true
        });
    },
    AuthLogout() {
        return request.get('/logout',{ withCredentials: true });
    }

};

export default auth;