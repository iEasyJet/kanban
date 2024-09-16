const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { sectionId } = req.body;

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
  console.log(req.body);

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
  const { taskId } = req.params;
  try {
    const currentTask = await Task.findById(taskId);
    await Task.findByIdAndDelete(taskId);
    const tasks = await Task.find({ section: currentTask.section }).sort(
      'position'
    );

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

exports.updatePositionTask = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;

  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();

  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key]._id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }

    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key]._id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }

    res.status(200).json('updated');
  } catch (error) {
    res.status(500).json(error);
  }
};
