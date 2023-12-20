exports.seed = function (knex) {
    return Promise.all([
        knex('users').insert([
            { phone: '123456', password: '111' }
        ]),
        knex('categories').insert([
            { name: '技术动态' },
            { name: '极客新闻' },
            { name: '通知公告' },
            { name: '技术热点' },
            { name: '新课列表' },
        ]),
        knex('articles').insert([
            { title: 'article01', content: 'content01', category:'技术动态' },
        ])
    ])
};
