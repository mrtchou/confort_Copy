const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.put('/:id', checkRole('ADMIN'), productController.updateProduct)
router.delete('/:id', checkRole('ADMIN'), productController.deleteProduct)

module.exports = router;