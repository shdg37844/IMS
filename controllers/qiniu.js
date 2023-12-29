const qiniu = require('qiniu');
const ACCESSKEY = process.env.ACCESSKEY;
const SECRETKEY = process.env.SECRETKEY;

const qiniuController = {
    uploadToken: async function (req, res, next) {
        try {
            const mac = new qiniu.auth.digest.Mac(ACCESSKEY, SECRETKEY);
            const options = {
                scope: 'aitschool', // 空间名称
            };
            const putPolicy = new qiniu.rs.PutPolicy(options);
            const uploadToken = putPolicy.uploadToken(mac);
            res.json({
                token: uploadToken,
                domain: 's6dlgqfb9.hn-bkt.clouddn.com',  //域名
            });
        } catch (e) {
            console.log(e);
            res.json({ code: 0, message: 'server error' })
        }
    },
}

module.exports = qiniuController;