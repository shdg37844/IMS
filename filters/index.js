// filters/index.js
const moment = require('moment');

function formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

function loginFilter(app) {
    app.use(require('./loginFilter.js'));
}

module.exports = {
    formatDate,
    loginFilter
};
