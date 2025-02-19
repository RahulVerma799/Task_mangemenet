let tasks = [];

class Task {
  static getAllTasks() {
    return tasks;
  }

  static getTaskById(id) {
    return tasks.find(task => task.id === id);
  }

  static addTask(task) {
    const newTask = { id: Date.now(), ...task, completed: false };
    tasks.push(newTask);
    return newTask;
  }

  static updateTask(id, updatedTask) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      return tasks[taskIndex];
    }
    return null;
  }

  static deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    return true;
  }
}

module.exports = Task;


