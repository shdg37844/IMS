exports.up = function (knex) {
    return knex.schema
        // 用户
        .createTable('users', function (table) {
            table.increments('id');
            table.string('phone', 255).notNullable().unique();   //notNullable(): 字段不允许为空
            table.string('password', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('visited_at').defaultTo(knex.fn.now());
        })
        // 分类
        .createTable('classify', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('visited_at').defaultTo(knex.fn.now());
        })
        // 文章
        .createTable('articles', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('content', 255).notNullable();
            table.string('category', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('visited_at').defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("users")
        .dropTable("classify")
        .dropTable("articles")
};
