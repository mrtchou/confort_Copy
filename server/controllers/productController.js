const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Product, ProductInfo } = require('../models/models');

class productController {

    // Fonction de creation d'un produit
    async createProduct(req, res, next) {
        try {
            let { name, price, typeId, info } = req.body;
            const { img } = req.files;
            // Creation d'un nom de fichier via uuid
            let fileName = uuid.v4() + ".jpg";
            // Le chemin vers le fichier importe
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            // Fonction sequelize create (creation)
            const product = await Product.create({ name, price, typeId, img: fileName });

            // Cretion de la description du produit
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            };

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };


    // Fonction de mise a jour du produit (fonction sequelize update)
    async updateProduct(req, res, next) {
        const { id } = req.params;
        let { name, price, typeId } = req.body;
        console.log(name + 'heeeeeeeeeeeNAME', price + 'heeeeeeeeeeePRICE', typeId + req + 'heeeeeeeeeee')

        let product = await Product.update(
            {
                name,
                price,
                typeId
            },
            {
                where: { id }
            }
        );
        return res.json(product);
    };

    // Fonction de recuperation de tous les produits (fonction sequelize findAll)
    async getAllProducts(req, res, next) {
        const products = await Product.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['price', 'DESC']]
        });

        return res.json(products);
    };

    // Fonction de recuperation d'un produit via id (fonction sequelize findOne)
    async getOneProduct(req, res, next) {
        const { id } = req.params;
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        );
        return res.json(product)
    };

    // Fonction de suppression d'un produit
    async deleteProduct(req, res) {
        const { id } = req.params;
        const product = await Product.destroy(
            {
                where: { id }
            },
        );
        return res.json(product);
    };
};

module.exports = new productController();