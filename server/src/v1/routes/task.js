const router = require('express').Router({ mergeParams: true });
const { param, body } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const taskController = require('../controllers/task');

router.post(
  '/',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  body('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID секции');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.createTask
);

router.put(
  '/update-position',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePositionTask
);

router.delete(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID задачи');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.deleteTask
);

router.put(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID задачи');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updateTask
);

module.exports = router;
