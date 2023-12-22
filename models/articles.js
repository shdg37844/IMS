const Base = require('./baseModel.js');

class Article extends Base {
    constructor(props = 'articles') {
        super(props);
    }
}

module.exports = Article