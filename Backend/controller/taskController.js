const Task = require('../model/taskModel');

const getAllTasks = (req, res) => {
  const tasks = Task.getAllTasks();
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = Task.getTaskById(taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const addTask = (req, res) => {
  const newTask = Task.addTask(req.body);
  res.status(201).json({ message: 'Task added successfully!', task: newTask });
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = Task.updateTask(taskId, req.body);
  if (updatedTask) {
    res.json({ message: 'Task updated successfully!', task: updatedTask });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  Task.deleteTask(taskId);
  res.status(200).json({ message: 'Task deleted successfully!' });
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};