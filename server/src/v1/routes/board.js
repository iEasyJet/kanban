const router = require('express').Router();
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const boardController = require('../controllers/board');

router.post('/', tokenHandler.verifyToken, boardController.createBoard);

router.get('/', tokenHandler.verifyToken, boardController.getAllBoards);

router.get(
  '/favorites',
  tokenHandler.verifyToken,
  boardController.getFavoriteBoards
);

router.put('/', tokenHandler.verifyToken, boardController.updatePositionBoard);

router.put(
  '/favorites',
  tokenHandler.verifyToken,
  boardController.updateFavotitePosition
);

router.delete(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  boardController.deleteBoard
);

router.get(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  boardController.getOneBoard
);

router.put(
  '/:boardId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Невалидный ID доски');
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  boardController.updateBoard
);

module.exports = router;
