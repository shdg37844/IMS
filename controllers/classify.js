const classifyModel = require('../models/classify');
const Classify = new classifyModel();

const classifyController = {
    getAllClassify: async function (req, res, next) {
        try {
            const classify = await Classify.all();
            res.json({ code: 200, data: classify });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    }
}

module.exports = classifyController;