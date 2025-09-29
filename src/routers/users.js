const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validateRequest } = require('../middlewares/validate');

// CRUD Users
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('valid email required'),
    body('password').isLength({ min: 6 }).withMessage('password min 6 chars'),
  ],
  validateRequest,
  usersController.createUser
);

router.get('/', usersController.listUsers);
router.get('/:id', [param('id').isInt()], validateRequest, usersController.getUser);
router.put(
  '/:id',
  [
    param('id').isInt(),
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
  ],
  validateRequest,
  usersController.updateUser
);
router.delete('/:id', [param('id').isInt()], validateRequest, usersController.deleteUser);

// GET /users/:id/posts
router.get('/:id/posts', [param('id').isInt()], validateRequest, usersController.getUserPosts);

module.exports = router;
