class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(task) {
    const newTask = {
      id: this.nextId,
      completed: false,
      ...task
    };

    this.nextId += 1;
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

  deleteTask(id) {
    const taskId = Number(id);
    const originalLength = this.tasks.length;

    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    return originalLength !== this.tasks.length;
  }

  getAllTasks() {
    return [...this.tasks];
  }
}
