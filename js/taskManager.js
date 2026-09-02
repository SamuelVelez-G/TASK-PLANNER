class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(task) {
    this.currentId += 1;

    const newTask = {
      id: this.currentId,
      completed: false,
      ...task
    };

    this.tasks.push(newTask);
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === Number(id));

    if (!task) {
      return null;
    }

    task.completed = !task.completed;

    if (task.completed) {
      task.status = 'completada';     
    } else if (task.status === 'completada') {
      task.status = 'pendiente';
    }

    return task;
  }

  deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }

  getAllTasks() {
    return [...this.tasks];
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  load() {
    const stored = localStorage.getItem('tasks');

    if (!stored) {
      return false;
    }

    this.tasks = JSON.parse(stored);
    this.currentId = this.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
    return true;
  }
}
