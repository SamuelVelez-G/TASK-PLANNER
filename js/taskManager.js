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
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);

    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  load() {
    const tasksJson = localStorage.getItem('tasks');

    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }

    const currentId = localStorage.getItem('currentId');

    if (currentId) {
      this.currentId = Number(currentId);
    } else if (this.tasks.length > 0) {
      this.currentId = this.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
    }

    return Boolean(tasksJson);
  }
}
