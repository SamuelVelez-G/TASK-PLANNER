<div align="center">

# Peldaño

**Planificador de tareas personales — un peldaño a la vez.**

Aplicación web para registrar, organizar y dar seguimiento a tareas diarias,
con filtros por período, indicadores de progreso y modo claro/oscuro.

[![Demo](https://img.shields.io/badge/Demo-en_vivo-ea580c?style=for-the-badge)](https://samuelvelez-g.github.io/TASK-PLANNER/)
[![Figma](https://img.shields.io/badge/Figma-wireframe-f24e1e?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/tzjdH7Am96apQPk7aEDOzs/Task-Planner?node-id=0-1&t=hyKsK6x71MZ6wUgI-1)
[![Trello](https://img.shields.io/badge/Trello-tablero-0052cc?style=for-the-badge&logo=trello&logoColor=white)](https://trello.com/b/snhHtI0n/task-planner)

</div>

---

## Sobre el proyecto

Peldaño nace de una idea simple: la mayoría de los gestores de tareas muestran una lista plana
que crece hasta volverse inmanejable. Este proyecto organiza las tareas por **horizonte temporal**
—hoy, esta semana, este mes— para que el usuario vea solo lo que necesita atender ahora.

Cada tarea se registra con nombre, descripción, fecha de entrega, estado y prioridad, y se
representa mediante un componente visual reutilizable que permite identificar de un vistazo
qué es urgente y qué está en curso.

Es el proyecto individual del Bootcamp Full Stack Java, construido de forma incremental a lo
largo de varios sprints siguiendo un flujo de trabajo similar al de un equipo de desarrollo real.

## Vista previa

## Características

| | |
|---|---|
| **Registro de tareas** | Formulario con nombre, descripción, fecha de entrega, estado y prioridad |
| **Validación de entradas** | Verificación en JavaScript con retroalimentación visual inmediata |
| **Tarjeta de tarea** | Componente reutilizable con jerarquía visual en tres niveles |
| **Filtros por período** | Navegación lateral por Hoy, Esta semana, Este mes y Completadas |
| **Panel de resumen** | Totales de tareas y barra de progreso general |
| **Modo claro y oscuro** | Sistema de temas basado en variables CSS, con paleta propia para cada modo |
| **Interfaz responsiva** | Construida sobre el sistema de rejilla de Bootstrap 5 |

## Stack

<p>
<img src="https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Bootstrap_5-7952b3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
<img src="https://img.shields.io/badge/Git-f05032?style=flat-square&logo=git&logoColor=white" alt="Git">
<img src="https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=github&logoColor=white" alt="GitHub Pages">
</p>

**Herramientas de trabajo:** Figma (wireframe), Trello (gestión del sprint), Visual Studio Code.

## Decisiones técnicas

Algunas elecciones que vale la pena señalar:

- **Variables CSS en `:root`** en lugar de valores fijos. Toda la paleta se define en un solo
  lugar y se redefine dentro de `[data-bs-theme="dark"]`, de modo que el cambio de tema
  se reduce a alternar un atributo en la etiqueta `<html>`.
- **Sobrescritura de las variables internas de Bootstrap** (`--bs-card-bg`, `--bs-btn-bg`)
  en vez de recurrir a `!important`, manteniendo el CSS limpio y predecible.
- **Separación de responsabilidades en JavaScript**: `dark.js` gestiona la apariencia y
  `app.js` la lógica de la aplicación, cada uno con un propósito único.
- **Estado y prioridad diferenciados por forma, no solo por color** (contorno frente a relleno),
  para que la información siga siendo legible sin depender de la percepción cromática.
- **Logo en SVG inline** cuyos colores derivan de las mismas variables CSS, por lo que se
  adapta automáticamente al tema activo.

## Estructura del proyecto

```
TASK-PLANNER/
├── index.html          # Estructura de la interfaz
├── README.md
├── .gitignore
├── css/
│   └── styles.css      # Variables de tema y estilos propios
└── js/
    ├── dark.js         # Alternancia entre modo claro y oscuro
    └── app.js          # Validación del formulario de tareas
```

**Fase de planificación:** repositorio en GitHub, tablero de Trello con las actividades del sprint
y wireframe de baja fidelidad en Figma.


## Enlaces

| Recurso | Enlace |
|---|---|
| Demo en vivo | https://samuelvelez-g.github.io/TASK-PLANNER/ |
| Wireframe en Figma | https://www.figma.com/design/tzjdH7Am96apQPk7aEDOzs/Task-Planner?node-id=0-1&t=hyKsK6x71MZ6wUgI-1 |
| Tablero de Trello | https://trello.com/b/snhHtI0n/task-planner |

## Autor

**Samuel Vélez** · [@SamuelVelez-G](https://github.com/SamuelVelez-G)
