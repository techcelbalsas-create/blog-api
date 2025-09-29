const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { validateRequest } = require('../middlewares/validate');

router.post(
  '/',
  [body('name').notEmpty().withMessage('name is required')],
  validateRequest,
  categoriesController.createCategory
);

router.get('/', categoriesController.listCategories);
router.put(
  '/:id',
  [param('id').isInt(), body('name').notEmpty()],
  validateRequest,
  categoriesController.updateCategory
);
router.delete('/:id', [param('id').isInt()], validateRequest, categoriesController.deleteCategory);

module.exports = router;
