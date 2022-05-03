const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.createType)
router.get('/', typeController.getAllTypes)
router.get('/:id', typeController.getOneType)
router.put('/:id', checkRole('ADMIN'), typeController.updateType)
router.delete('/:id', checkRole('ADMIN'), typeController.deleteType)

module.exports = router;