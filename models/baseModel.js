const config = require('../knexfile.js');
const knex = require('knex')(config);

class basicModel {
    constructor(props) {
        this.table = props;
    }

    knex() {
        return knex(this.table)
    }

    where(params) {
        return knex(this.table).where(params);
    }
}

module.exports = basicModel;