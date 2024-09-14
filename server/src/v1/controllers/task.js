const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const tasks = await Task.find({ section: sectionId });
    const task = await Task.create({
      section: sectionId,
      position: tasks.length > 0 ? tasks.length : 0,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteTask = async (req, res) => {
  const { sectionId, taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    const tasks = await Task.find({ section: sectionId }).sort('position');

    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key]._id, {
        $set: { position: key },
      });
    }

    res.status(200).json('deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
