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
