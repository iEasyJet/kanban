const router = require('express').Router({ mergeParams: true });
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const sectionController = require('../controllers/section');

router.post(
  '/',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.createSection
);

router.put(
  '/:sectionId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  param('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID секции');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.updateSection
);

router.delete(
  '/:sectionId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  param('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID секции');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.deleteSection
);

module.exports = router;
