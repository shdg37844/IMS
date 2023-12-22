const Base = require('./baseModel.js');

class User extends Base {
    constructor(props = 'users') {
        super(props);
    }
}

module.exports = User