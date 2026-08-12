/* ============================================================
   app.js
   Sprint 1 - Tarea 3
   Validacion de las entradas del formulario de tareas.
   ============================================================ */

/* ------------------------------------------------------------
   1. REFERENCIAS AL DOM
   Guardamos los elementos del HTML en constantes para no tener
   que buscarlos cada vez que los necesitemos.
   ------------------------------------------------------------ */

const newTaskForm = document.querySelector('#newTaskForm');

const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
const newTaskDueDateInput = document.querySelector('#newTaskDueDateInput');
const newTaskStatusInput = document.querySelector('#newTaskStatusInput');
const newTaskPriorityInput = document.querySelector('#newTaskPriorityInput');

const formAlert = document.querySelector('#formAlert');
const formAlertList = document.querySelector('#formAlertList');
const formSuccess = document.querySelector('#formSuccess');


/* ------------------------------------------------------------
   2. FUNCION DE VALIDACION
   Recibe un objeto con los datos y devuelve otro objeto que
   indica si son validos y, si no, cuales son los errores.
   ------------------------------------------------------------ */

/**
 * Valida los datos ingresados en el formulario de tareas.
 * @param {Object} data - Datos capturados del formulario.
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validFormFieldInput(data) {
  const errors = [];

  // --- Nombre: no puede estar vacio ---
  // .trim() elimina los espacios al inicio y al final.
  // Sin el, escribir solo "   " pasaria como valido.
  if (data.name.trim() === '') {
    errors.push('El nombre de la tarea es obligatorio.');
  } else if (data.name.trim().length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres.');
  }

  // --- Descripcion: no puede estar vacia ---
  if (data.description.trim() === '') {
    errors.push('La descripcion es obligatoria.');
  }

  // --- Fecha de entrega: debe contener una fecha ---
  if (data.dueDate === '') {
    errors.push('Debes seleccionar una fecha de entrega.');
  }

  // --- Estado: debe tener una opcion seleccionada ---
  // La opcion "Elegir..." tiene value="", por eso comparamos con cadena vacia.
  if (data.status === '') {
    errors.push('Debes seleccionar un estado.');
  }

  // --- Prioridad: campo propio del proyecto ---
  if (data.priority === '') {
    errors.push('Debes seleccionar una prioridad.');
  }

  // isValid es true solo si el arreglo de errores quedo vacio.
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}


/* ------------------------------------------------------------
   3. FUNCIONES PARA MOSTRAR Y OCULTAR LAS ALERTAS
   La clase d-none de Bootstrap equivale a display: none.
   Agregarla oculta el elemento; quitarla lo muestra.
   ------------------------------------------------------------ */

/**
 * Muestra la alerta de error con la lista de problemas encontrados.
 * @param {string[]} errors
 */
function mostrarErrores(errors) {
  formAlertList.innerHTML = ''; // limpiamos los errores anteriores

  errors.forEach(function (error) {
    const item = document.createElement('li');
    item.textContent = error;
    formAlertList.appendChild(item);
  });

  formAlert.classList.remove('d-none');
  formSuccess.classList.add('d-none');
}

/** Oculta la alerta de error y muestra la de exito. */
function mostrarExito() {
  formAlert.classList.add('d-none');
  formSuccess.classList.remove('d-none');
}

/** Oculta ambas alertas. */
function ocultarAlertas() {
  formAlert.classList.add('d-none');
  formSuccess.classList.add('d-none');
}


/* ------------------------------------------------------------
   4. EVENTO SUBMIT DEL FORMULARIO
   Aqui se conecta todo: capturamos, validamos y respondemos.
   ------------------------------------------------------------ */

newTaskForm.addEventListener('submit', function (event) {
  // Evita que el navegador recargue la pagina al enviar el formulario.
  event.preventDefault();

  // --- Capturar los valores ingresados ---
  const name = newTaskNameInput.value;
  const description = newTaskDescriptionInput.value;
  const dueDate = newTaskDueDateInput.value;
  const status = newTaskStatusInput.value;
  const priority = newTaskPriorityInput.value;

  // --- Comprobar en consola que los datos llegan bien (Paso 2.4) ---
  console.log('name: ' + name);
  console.log('description: ' + description);
  console.log('dueDate: ' + dueDate);
  console.log('status: ' + status);
  console.log('priority: ' + priority);

  // --- Agrupar los datos en un objeto ---
  const data = {
    name: name,
    description: description,
    dueDate: dueDate,
    status: status,
    priority: priority
  };

  // --- Validar ---
  const result = validFormFieldInput(data);

  if (result.isValid) {
    mostrarExito();
    console.log('Datos validos:', data);

    // En el proximo sprint, aqui se creara la tarjeta de la tarea.
    newTaskForm.reset();
  } else {
    mostrarErrores(result.errors);
    console.log('Errores encontrados:', result.errors);
  }
});


/* ------------------------------------------------------------
   5. LIMPIAR ALERTAS AL ESCRIBIR
   Buena practica de UX: si el usuario ya esta corrigiendo,
   no tiene sentido seguir mostrandole el error anterior.
   ------------------------------------------------------------ */

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