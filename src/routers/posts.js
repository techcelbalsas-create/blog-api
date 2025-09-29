const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { validateRequest } = require('../middlewares/validate');

// Create post
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('title required'),
    body('content').notEmpty().withMessage('content required'),
    body('userId').isInt().withMessage('userId must be integer'),
    body('categoryId').isInt().withMessage('categoryId must be integer'),
  ],
  validateRequest,
  postsController.createPost
);

// List posts with pagination ?page=1&limit=10
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
  ],
  validateRequest,
  postsController.listPosts
);

router.get('/:id', [param('id').isInt()], validateRequest, postsController.getPost);
router.put(
  '/:id',
  [
    param('id').isInt(),
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('categoryId').optional().isInt(),
  ],
  validateRequest,
  postsController.updatePost
);
router.delete('/:id', [param('id').isInt()], validateRequest, postsController.deletePost);

module.exports = router;
