const taskManager = new TaskManager();

const listContainer = document.querySelector('#listaTareas');
const newTaskForm = document.querySelector('#newTaskForm');
const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
const newTaskDueDateInput = document.querySelector('#newTaskDueDateInput');
const newTaskStatusInput = document.querySelector('#newTaskStatusInput');
const newTaskPriorityInput = document.querySelector('#newTaskPriorityInput');
const formAlert = document.querySelector('#formAlert');
const formAlertList = document.querySelector('#formAlertList');
const formSuccess = document.querySelector('#formSuccess');

function formatDate(dateString) {
  if (!dateString) {
    return 'Sin fecha';
  }

  const date = new Date(dateString + 'T00:00:00');

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

function validFormFieldInput(data) {
  const errors = [];

  if (data.name.trim() === '') {
    errors.push('El nombre de la tarea es obligatorio.');
  } else if (data.name.trim().length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres.');
  }

  if (data.description.trim() === '') {
    errors.push('La descripcion es obligatoria.');
  }

  if (data.dueDate === '') {
    errors.push('Debes seleccionar una fecha de entrega.');
  }

  if (data.status === '') {
    errors.push('Debes seleccionar un estado.');
  }

  if (data.priority === '') {
    errors.push('Debes seleccionar una prioridad.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function mostrarErrores(errors) {
  formAlertList.innerHTML = '';

  errors.forEach((error) => {
    const item = document.createElement('li');
    item.textContent = error;
    formAlertList.appendChild(item);
  });

  formAlert.classList.remove('d-none');
  formSuccess.classList.add('d-none');
}

function mostrarExito() {
  formAlert.classList.add('d-none');
  formSuccess.classList.remove('d-none');
}

function ocultarAlertas() {
  formAlert.classList.add('d-none');
  formSuccess.classList.add('d-none');
}

function getStatusConfig(status, completed) {
  const isCompleted = completed || status === 'completada';

  if (isCompleted) {
    return {
      text: 'Completada',
      className: 'estado-completada'
    };
  }

  if (status === 'proceso') {
    return {
      text: 'En proceso',
      className: 'estado-proceso'
    };
  }

  return {
    text: 'Pendiente',
    className: 'estado-pendiente'
  };
}

function renderTasks() {
  if (!listContainer) {
    return;
  }

  if (taskManager.tasks.length === 0) {
    listContainer.innerHTML = `
      <div class="estado-vacio text-center py-5">
        <i class="bi bi-clipboard-check"></i>
        <p class="h6 mt-3 mb-1">Aún no tienes tareas</p>
        <p class="text-muted small mb-0">Registra tu primera tarea en el formulario de la izquierda.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = taskManager.tasks
    .map((task) => {
      const isCompleted = task.completed || task.status === 'completada';
      const statusConfig = getStatusConfig(task.status, isCompleted);
      const priorityText = task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Sin prioridad';
      const taskClasses = `card task-card ${isCompleted ? 'task-completada' : ''}`;
      const taskNameClasses = `task-name h6 mb-1 ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`;

      return `
        <div class="${taskClasses}" data-task-id="${task.id}">
          <div class="card-body">
            <div class="d-flex align-items-start gap-2">
              <input
                class="form-check-input mt-1 flex-shrink-0 task-toggle"
                type="checkbox"
                data-task-id="${task.id}"
                ${isCompleted ? 'checked' : ''}
              >
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start gap-2">
                  <h3 class="${taskNameClasses}">${task.name}</h3>
                  <div class="d-flex gap-2 flex-shrink-0">
                    <button type="button" class="btn btn-link p-0 delete-task" data-task-id="${task.id}" aria-label="Eliminar tarea">
                      <i class="bi bi-trash" title="Eliminar"></i>
                    </button>
                  </div>
                </div>
                <p class="small text-muted mb-2">${task.description}</p>
                <div class="d-flex flex-wrap align-items-center gap-2">
                  <small class="text-muted"><i class="bi bi-calendar-event"></i> ${formatDate(task.dueDate)}</small>
                  <span class="badge badge-estado ${statusConfig.className}">${statusConfig.text}</span>
                  <span class="badge badge-prioridad prioridad-${task.priority}">${priorityText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

const seedTasks = [
  {
    name: 'Comprar regalo de cumpleaños',
    description: 'Buscar un regalo para el cumpleaños de Ana y pasar por la tienda del centro.',
    dueDate: '2026-08-12',
    status: 'pendiente',
    priority: 'alta'
  },
  {
    name: 'Cita médica de control',
    description: 'Llevar los exámenes de laboratorio y la orden médica impresa.',
    dueDate: '2026-08-18',
    status: 'pendiente',
    priority: 'media'
  },
  {
    name: 'Terminar informe mensual',
    description: 'Consolidar las cifras del área y redactar las conclusiones del período.',
    dueDate: '2026-08-22',
    status: 'proceso',
    priority: 'alta'
  },
  {
    name: 'Renovar suscripción del hosting',
    description: 'Revisar los planes disponibles antes de que venza el servicio actual.',
    dueDate: '2026-08-30',
    status: 'pendiente',
    priority: 'baja'
  },
  {
    name: 'Reunión familiar del domingo',
    description: 'Confirmar asistencia y llevar el postre acordado con la familia.',
    dueDate: '2026-08-03',
    status: 'completada',
    priority: 'baja',
    completed: true
  }
];

seedTasks.forEach((task) => {
  taskManager.addTask(task);
});

renderTasks();

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    name: newTaskNameInput.value,
    description: newTaskDescriptionInput.value,
    dueDate: newTaskDueDateInput.value,
    status: newTaskStatusInput.value,
    priority: newTaskPriorityInput.value
  };

  const validationResult = validFormFieldInput(data);

  if (!validationResult.isValid) {
    mostrarErrores(validationResult.errors);
    return;
  }

  const newTask = {
    name: data.name.trim(),
    description: data.description.trim(),
    dueDate: data.dueDate,
    status: data.status,
    priority: data.priority,
    completed: data.status === 'completada'
  };

  taskManager.addTask(newTask);
  newTaskForm.reset();
  mostrarExito();
  renderTasks();
});

listContainer.addEventListener('change', (event) => {
  const toggle = event.target.closest('.task-toggle');

  if (!toggle) {
    return;
  }

  const taskId = Number(toggle.dataset.taskId);
  taskManager.toggleTask(taskId);
  renderTasks();
});

listContainer.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-task');

  if (!deleteButton) {
    return;
  }

  const taskId = Number(deleteButton.dataset.taskId);
  taskManager.deleteTask(taskId);
  renderTasks();
});

[newTaskNameInput, newTaskDescriptionInput, newTaskDueDateInput, newTaskStatusInput, newTaskPriorityInput].forEach((field) => {
  field.addEventListener('input', ocultarAlertas);
  field.addEventListener('change', ocultarAlertas);
});
