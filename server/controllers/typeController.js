const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class typeController {
    async createType(req, res, next) {
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json(type);
    };

    async getAllTypes(req, res, next) {
        const types = await Type.findAll()
        return res.json(types)
    };

    async getOneType(req, res, next) {
        const {id} = req.params;
        const type = await Type.findOne(
            {
                where: {id}
            },
        )
        return res.json(type)
    };

    async updateType(req, res, next) {
        const {id} = req.params;
        let type = await Type.update(
                {name: req.body.name}, 
                {where: {id}}
            );
        return res.json(type)
    };

    async deleteType(req, res, next) {
        const {id} = req.params;
        const type = await Type.destroy(
            {
                where: {id}
            },
        )
        return res.json(type);
    };

};

module.exports = new typeController();