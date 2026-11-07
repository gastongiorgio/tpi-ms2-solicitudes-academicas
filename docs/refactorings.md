# Refactorings realizados

## Objetivo

El objetivo de esta etapa fue mejorar la calidad interna del sistema sin modificar su comportamiento externo.

Se conservaron los mismos endpoints, operaciones principales y funcionalidades visibles para el usuario. Los cambios se concentraron en reducir duplicación, separar responsabilidades y mejorar la legibilidad y mantenibilidad del código.

---

## RF-01 - Eliminación de código muerto

### Problema detectado

En `backend/src/app.js` permanecían arreglos temporales de estudiantes, responsables y solicitudes que habían sido utilizados antes de incorporar PostgreSQL.

Luego de integrar la base de datos, estas estructuras dejaron de utilizarse, pero continuaban presentes en el código.

### Técnica aplicada

**Eliminación de código muerto.**

### Cambio realizado

Se eliminaron los arreglos temporales que almacenaban información en memoria.

PostgreSQL quedó como única fuente de datos del sistema.

### Archivos involucrados

- `backend/src/app.js`

### Resultado

El código quedó más claro y se eliminó la posibilidad de confundir los datos temporales con los datos persistidos en PostgreSQL.

---

## RF-02 - Centralización de estados de solicitud

### Problema detectado

Los estados permitidos de una solicitud aparecían escritos directamente dentro de las validaciones del código:

- `PENDIENTE`
- `EN_PROCESO`
- `COMPLETADA`

Esto generaba valores de dominio repetidos y obligaba a modificar diferentes lugares si los estados cambiaban.

### Técnica aplicada

**Extract Constant.**

### Cambio realizado

Se creó el archivo:

`backend/src/constants/estadosSolicitud.js`

con los estados permitidos:

```js
const ESTADOS_SOLICITUD = [
  "PENDIENTE",
  "EN_PROCESO",
  "COMPLETADA",
];

module.exports = ESTADOS_SOLICITUD;
```

La validación del cambio de estado pasó a utilizar esta constante:

```js
if (!ESTADOS_SOLICITUD.includes(estado)) {
  return res.status(400).json({
    message: "Estado inválido",
  });
}
```

### Archivos involucrados

- `backend/src/app.js`
- `backend/src/constants/estadosSolicitud.js`

### Resultado

Los estados válidos quedaron definidos en un único lugar y se redujo la presencia de valores de dominio repetidos.

---

## RF-03 - Reubicación del acceso a datos de solicitudes

### Problema detectado

`backend/src/app.js` tenía demasiadas responsabilidades.

Además de configurar Express y definir las rutas HTTP, contenía directamente las consultas SQL relacionadas con las solicitudes.

Esto aumentaba el tamaño del archivo y generaba un fuerte acoplamiento entre las rutas y PostgreSQL.

### Técnica aplicada

**Move Method / reubicación de responsabilidades.**

### Cambio realizado

Se creó:

`backend/src/repositories/solicitudRepository.js`

Las operaciones de acceso a datos relacionadas con solicitudes fueron trasladadas a este repositorio.

El repositorio contiene las funciones:

```js
listar(filtros)
obtenerPorId(id)
crear(datosSolicitud)
cambiarEstado(id, estado)
asignarResponsable(id, responsableId)
```

Por ejemplo, antes la ruta `GET /solicitudes/:id` ejecutaba directamente la consulta SQL.

Después del refactoring, la ruta utiliza:

```js
const solicitud = await solicitudRepository.obtenerPorId(id);
```

La consulta queda encapsulada dentro del repositorio.

### Archivos involucrados

- `backend/src/app.js`
- `backend/src/repositories/solicitudRepository.js`

### Resultado

Se separó la responsabilidad de acceso a datos de la responsabilidad HTTP.

`app.js` quedó menos acoplado a PostgreSQL y las consultas relacionadas con solicitudes quedaron agrupadas en un único módulo.

---

## RF-04 - Introducción de un objeto de parámetros

### Problema detectado

Durante la creación de una solicitud, sus datos se manipulaban individualmente:

- tipo;
- descripción;
- prioridad;
- estudiante.

Estos valores pertenecen a una misma operación y representan los datos de una solicitud.

### Técnica aplicada

**Introduce Parameter Object / equivalente.**

### Cambio realizado

Los datos relacionados fueron agrupados en un único objeto denominado `datosSolicitud`.

La ruta utiliza:

```js
const datosSolicitud = req.body;
```

y luego pasa ese objeto al repositorio:

```js
const solicitud = await solicitudRepository.crear(datosSolicitud);
```

Dentro del repositorio se extraen los valores necesarios:

```js
async function crear(datosSolicitud) {
  const {
    tipo,
    descripcion,
    prioridad,
    estudianteId,
  } = datosSolicitud;

  // Consulta SQL
}
```

### Archivos involucrados

- `backend/src/app.js`
- `backend/src/repositories/solicitudRepository.js`

### Resultado

Los datos relacionados con una solicitud se transmiten juntos, reduciendo la cantidad de parámetros individuales y haciendo más clara la comunicación entre la ruta y el repositorio.

---

## RF-05 - Extracción de la validación de campos obligatorios

### Problema detectado

La lógica utilizada para comprobar si faltaban datos obligatorios estaba incluida directamente dentro del endpoint `POST /solicitudes`.

Esto agregaba responsabilidad y lógica adicional a la ruta.

### Técnica aplicada

**Extract Method.**

### Cambio realizado

Se extrajo la validación a una función independiente:

```js
function faltanDatosObligatorios(datosSolicitud) {
  const {
    tipo,
    descripcion,
    prioridad,
    estudianteId,
  } = datosSolicitud;

  return !tipo || !descripcion || !prioridad || !estudianteId;
}
```

El endpoint pasó a utilizar:

```js
if (faltanDatosObligatorios(datosSolicitud)) {
  return res.status(400).json({
    message: "Faltan datos obligatorios",
  });
}
```

### Archivos involucrados

- `backend/src/app.js`

### Resultado

La ruta quedó más sencilla de leer y la validación pasó a estar representada por una función con un nombre que expresa claramente su propósito.

---

## RF-06 - Centralización de la comunicación del frontend con la API

### Problema detectado

`frontend/src/App.jsx` realizaba directamente todas las llamadas HTTP mediante `fetch`.

Además, la dirección:

`http://localhost:3000`

se encontraba repetida en diferentes lugares.

También se repetía la lógica para volver a consultar todas las solicitudes después de:

- crear una solicitud;
- cambiar un estado;
- asignar un responsable.

### Técnica aplicada

**Extract Module** y **Extract Method**.

### Cambio realizado

Se creó:

`frontend/src/services/api.js`

El archivo centraliza la URL de la API:

```js
const API_URL = "http://localhost:3000";
```

También concentra las operaciones HTTP:

```js
obtenerSolicitudes()
obtenerEstudiantes()
obtenerResponsables()
crearSolicitud(datosSolicitud)
cambiarEstadoSolicitud(id, estado)
asignarResponsableSolicitud(id, responsableId)
```

Además, en `App.jsx` se creó la función:

```js
async function cargarSolicitudes() {
  const datos = await obtenerSolicitudes();
  setSolicitudes(datos);
}
```

Esta función se reutiliza después de las operaciones que modifican solicitudes.

### Archivos involucrados

- `frontend/src/App.jsx`
- `frontend/src/services/api.js`

### Resultado

Se eliminó la repetición de la URL de la API y se redujo la duplicación de llamadas `fetch`.

`App.jsx` quedó menos acoplado a los detalles de comunicación HTTP y la lógica de acceso a la API quedó concentrada en un módulo específico.

---

# Relación con los problemas detectados

Los refactorings realizados responden directamente a varios hallazgos registrados durante el diagnóstico inicial.

| Hallazgo | Mejora realizada |
|---|---|
| Archivo backend con demasiadas responsabilidades | Se trasladaron las consultas de solicitudes al repositorio |
| Duplicación de consultas y lógica de acceso a datos | Se centralizaron las operaciones en `solicitudRepository.js` |
| Strings mágicos y valores de dominio repetidos | Se creó `estadosSolicitud.js` |
| Código muerto | Se eliminaron las estructuras temporales en memoria |
| Componente frontend con demasiadas responsabilidades | Se extrajo la comunicación HTTP a `services/api.js` |
| Duplicación de llamadas para recargar solicitudes | Se creó `cargarSolicitudes()` |
| URL de API repetida | Se centralizó en `API_URL` |

---

# Principios de calidad aplicados

## Responsabilidad Única

La separación de las consultas SQL en un repositorio permitió reducir responsabilidades dentro de `app.js`.

El archivo principal continúa gestionando las rutas HTTP, mientras que el repositorio se encarga del acceso a los datos de solicitudes.

En el frontend, `App.jsx` dejó de contener directamente todos los detalles de las llamadas HTTP.

---

## Reducción de duplicación

Se eliminaron diferentes formas de repetición:

- URL de API repetida;
- llamadas repetidas para recargar solicitudes;
- estados permitidos escritos directamente en las validaciones;
- código temporal sin utilización.

---

## Legibilidad

Se incorporaron funciones y módulos con nombres que expresan su propósito, por ejemplo:

- `faltanDatosObligatorios`
- `cargarSolicitudes`
- `obtenerPorId`
- `cambiarEstado`
- `asignarResponsable`

Esto permite comprender con mayor rapidez qué realiza cada parte del código.

---

## Separación de responsabilidades

Antes del refactoring, gran parte de la lógica estaba concentrada principalmente en:

- `backend/src/app.js`
- `frontend/src/App.jsx`

Luego del refactoring se incorporaron módulos específicos:

```text
backend/src/constants/estadosSolicitud.js
backend/src/repositories/solicitudRepository.js
frontend/src/services/api.js
```

De esta manera, cada archivo tiene una responsabilidad más concreta.

---

# Conservación del comportamiento externo

Los refactorings realizados modifican la organización interna del código, pero no buscan cambiar las funcionalidades disponibles para el usuario.

Se conservaron los principales endpoints:

```text
GET /solicitudes
GET /solicitudes/:id
POST /solicitudes
PATCH /solicitudes/:id/estado
PATCH /solicitudes/:id/responsable
```

También se conservaron las operaciones del frontend:

- visualizar solicitudes;
- crear solicitudes;
- filtrar solicitudes;
- cambiar el estado;
- asignar responsables.

Durante el desarrollo se realizaron pruebas parciales después de cada modificación para comprobar que las operaciones afectadas continuaran funcionando.

La verificación definitiva se realizará ejecutando nuevamente los mismos diez casos de prueba utilizados sobre la versión inicial.

Esto permitirá comparar los resultados obtenidos antes y después del refactoring y comprobar que las mejoras internas no modificaron el comportamiento externo del sistema.