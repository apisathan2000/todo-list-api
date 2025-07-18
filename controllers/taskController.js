import Task from "../models/taskModel.js";

export const getAllTasks = async function (req, res) {
  const user = req.user.id;

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  try {
    const tasks = await Task.find({ user: user })
      .skip(limit * (page - 1))
      .limit(limit);

    const count = await Task.where({ user: user }).countDocuments().exec();

    return res.status(200).json({
      msg: `Tasks fetched successfully`,
      tasks,
      page: page,
      limit: limit,
      total: count,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const postTask = async function (req, res) {
  const { id } = req.user;

  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description, user: id });

    return res.status(201).json({
      msg: `Task created successfully`,
      id: task.id,
      title: task.title,
      description: task.description,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateTask = async function (req, res) {
  const { id: userId } = req.user;

  const id = req.params.id;

  const { title, description } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `Task not found` });
    }

    if (task.user.toString() !== userId) {
      return res.status(400).json({ msg: `Only the owner can update tasks` });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: "true" }
    );

    return res
      .status(200)
      .json({ msg: `Task updated successfully`, updatedTask });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteTask = async function (req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `No tasks found with such id` });
    }

    if (task.user.toString() !== userId) {
      return res.status(400).json({ msg: `Only the owner can update tasks` });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    return res
      .status(204)
      .json({ msg: `Task ${deletedTask.id} deleted successfully` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
