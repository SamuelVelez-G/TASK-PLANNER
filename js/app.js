

const newTaskForm = document.querySelector('#newTaskForm');

const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
const newTaskDueDateInput = document.querySelector('#newTaskDueDateInput');
const newTaskStatusInput = document.querySelector('#newTaskStatusInput');
const newTaskPriorityInput = document.querySelector('#newTaskPriorityInput');

const formAlert = document.querySelector('#formAlert');
const formAlertList = document.querySelector('#formAlertList');
const formSuccess = document.querySelector('#formSuccess');


/**
 * Valida los datos ingresados en el formulario de tareas.
 * @param {Object} data - Datos capturados del formulario.
 * @returns {{ isValid: boolean, errors: string[] }}
 */
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
    errors: errors
  };
}



/**
 * Muestra la alerta de error con la lista de problemas encontrados.
 * @param {string[]} errors
 */
function mostrarErrores(errors) {
  formAlertList.innerHTML = ''; 

  errors.forEach(function (error) {
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

/** Oculta ambas alertas. */
function ocultarAlertas() {
  formAlert.classList.add('d-none');
  formSuccess.classList.add('d-none');
}




newTaskForm.addEventListener('submit', function (event) {

  event.preventDefault();


  const name = newTaskNameInput.value;
  const description = newTaskDescriptionInput.value;
  const dueDate = newTaskDueDateInput.value;
  const status = newTaskStatusInput.value;
  const priority = newTaskPriorityInput.value;


  console.log('name: ' + name);
  console.log('description: ' + description);
  console.log('dueDate: ' + dueDate);
  console.log('status: ' + status);
  console.log('priority: ' + priority);

 
  const data = {
    name: name,
    description: description,
    dueDate: dueDate,
    status: status,
    priority: priority
  };


  const result = validFormFieldInput(data);

  if (result.isValid) {
    mostrarExito();
    console.log('Datos validos:', data);

   
    newTaskForm.reset();
  } else {
    mostrarErrores(result.errors);
    console.log('Errores encontrados:', result.errors);
  }
});




const campos = [
  newTaskNameInput,
  newTaskDescriptionInput,
  newTaskDueDateInput,
  newTaskStatusInput,
  newTaskPriorityInput
];

campos.forEach(function (campo) {
  campo.addEventListener('input', ocultarAlertas);
});