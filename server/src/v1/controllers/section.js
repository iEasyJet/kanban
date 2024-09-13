const Section = require('../models/section');
const Task = require('../models/task');

exports.createSection = async (req, res) => {
  const { boardId } = req.params;
  try {
    const section = await Section.create({ board: boardId });
    section._doc.tasks = [];
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    section._doc.tasks = [];
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.findByIdAndDelete(sectionId);
    res.status(200).json('deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
