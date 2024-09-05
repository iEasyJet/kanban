const router = require('express').Router();
const userController = require('../controllers/user');
const { body } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const User = require('../models/user');

router.post(
  '/signup',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Имя пользователя должно содержать минимум 8 символов.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Пароль должен содержать минимум 8 символов.'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('Пароль подтверждения должен содержать минимум 8 символов.'),
  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Пользователь с таким именем уже создан.');
      }
    });
  }),
  validation.validate,
  userController.register
);

router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Имя пользователя должно содержать минимум 8 символов.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Пароль пользователя должен содержать минимум 8 символов.'),
  validation.validate,
  userController.login
);

router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
