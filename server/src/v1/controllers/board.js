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
  console.log(boards);

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
