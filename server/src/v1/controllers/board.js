const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');

exports.create = async (req, res) => {
  try {
    const boards = await Board.find();

    const board = await Board.create({
      user: req.user._id,
      position: boards.length > 0 ? boards.length : 0,
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort('-position');
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePosition = async (req, res) => {
  const { boards } = req.body;

  try {
    for (const key in boards) {
      await Board.findByIdAndUpdate(boards[key]._id, {
        $set: { position: key },
      });
    }
    res.status(200).json('updated');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId });
    if (!board) return res.status(404).json('Доска не найдена!');

    const sections = await Section.find({ board: boardId });
    for (const section of sections) {
      const tasks = await Task.find({ section: section._id })
        .populate('section')
        .sort('-position');
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favorite } = req.body;

  try {
    if (title === '') req.body.title = 'Без названия...';
    if (description === '')
      req.body.description = `Сюда можно добавить многострочное описание.
      Если все понятно, тогда вперед!`;

    const currentBoard = await Board.findById(boardId);
    if (!currentBoard) return res.status(404).json('Доска не найдена!');

    if (currentBoard.favorite !== favorite && favorite !== undefined) {
      const favorites = await Board.find({
        user: currentBoard.user,
        favorite: true,
        _id: { $ne: boardId },
      }).sort('favoritePosition');

      if (favorite) {
        req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
      } else {
        for (const key in favorites) {
          const el = favorites[key];

          await Board.findByIdAndUpdate(el._id, {
            $set: { favoritePosition: key },
          });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFavoriteBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      user: req.user._id,
      favorite: true,
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateFavotitePosition = async (req, res) => {
  const { boards } = req.body;

  try {
    for (const key in boards) {
      await Board.findByIdAndUpdate(boards[key]._id, {
        $set: { favoritePosition: key },
      });
    }
    res.status(200).json('updated');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    const sections = await Section.find({ board: boardId });
    for (const section of sections) {
      await Task.deleteMany({ section: section._id });
      await Section.findByIdAndDelete(section._id);
    }

    const currentBoard = await Board.findById(boardId);

    const boards = await Board.find({
      user: req.user._id,
      _id: {
        $ne: boardId,
      },
    }).sort('position');

    for (const key in boards) {
      await Board.findByIdAndUpdate(boards[key]._id, {
        $set: { position: key },
      });
    }

    if (currentBoard.favorite) {
      const favorites = await Board.find({
        user: currentBoard.user,
        favorite: true,
        _id: { $ne: boardId },
      }).sort('favoritePosition');

      for (const key in favorites) {
        const el = favorites[key];

        await Board.findByIdAndUpdate(el._id, {
          $set: { favoritePosition: key },
        });
      }
    }

    await Board.findOneAndDelete(boardId);

    res.status(200).json('deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
