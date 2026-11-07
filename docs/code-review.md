# Checklist de Code Review

La revisión se realizó sobre la versión refactorizada del sistema con el objetivo de comprobar legibilidad, separación de responsabilidades, duplicación, manejo de errores, acceso a datos y conservación del comportamiento externo.

## Legibilidad

- [x] Los nombres de variables y funciones expresan claramente su intención.
- [x] Las funciones principales tienen una extensión razonable.
- [x] Los comentarios utilizados identifican secciones sin repetir innecesariamente el código.
- [x] Los estados válidos del backend fueron centralizados en una constante.

## Responsabilidades

- [x] El acceso a datos de solicitudes fue separado de las rutas HTTP.
- [x] Las consultas de solicitudes se encuentran agrupadas en `solicitudRepository.js`.
- [x] La comunicación HTTP del frontend fue separada de `App.jsx`.
- [x] La validación de campos obligatorios fue extraída a una función específica.

### Observación

`app.js` todavía contiene algunas operaciones simples relacionadas con estudiantes y responsables. No se realizó una separación adicional para evitar agregar complejidad innecesaria al alcance del trabajo.

## Duplicación

- [x] La URL base de la API dejó de repetirse en el frontend.
- [x] La recarga de solicitudes fue centralizada en `cargarSolicitudes()`.
- [x] Las operaciones HTTP del frontend fueron agrupadas en `services/api.js`.
- [x] Se eliminaron estructuras temporales en memoria que habían quedado sin uso.

## Manejo de errores

- [x] Las rutas mantienen respuestas HTTP diferenciadas para operaciones exitosas y errores de validación.
- [x] Se conserva el uso de `400` para datos inválidos.
- [x] Se conserva el uso de `404` para solicitudes inexistentes.
- [x] Se conserva el uso de `500` para errores internos.
- [x] Los mensajes principales de error continúan siendo comprensibles para el cliente.

## Base de datos

- [x] Las consultas principales de solicitudes fueron trasladadas al repositorio.
- [x] Las credenciales de PostgreSQL se obtienen mediante variables de entorno.
- [x] El archivo `.env` no se almacena en el repositorio.
- [x] Los datos obligatorios son validados antes de crear una solicitud.
- [x] Se verifica la existencia del estudiante antes de crear una solicitud.
- [x] Se verifica la existencia del responsable antes de asignarlo.

## Frontend

- [x] Las llamadas HTTP se encuentran centralizadas en `frontend/src/services/api.js`.
- [x] `App.jsx` utiliza funciones del servicio en lugar de repetir llamadas `fetch`.
- [x] La actualización del listado reutiliza `cargarSolicitudes()`.
- [x] Las funciones principales del sistema continúan disponibles desde la interfaz.

## Pruebas

- [x] Se definieron diez casos de prueba funcionales.
- [x] Los diez casos fueron ejecutados sobre la versión inicial.
- [x] Los diez casos fueron ejecutados nuevamente después del refactoring.
- [x] Los resultados esperados se conservaron en todos los casos.
- [x] Las pruebas cuentan con evidencias obtenidas mediante Postman.

## Documentación

- [x] El diagnóstico inicial se encuentra documentado.
- [x] Los refactorings realizados se encuentran documentados.
- [x] Los casos de prueba y sus resultados están registrados.
- [x] El uso de inteligencia artificial está declarado.
- [x] Las evidencias gráficas se almacenan en `docs/evidencias`.
- [x] El README describe el sistema, las tecnologías y la forma básica de ejecución.

## Resultado de la revisión

La revisión final no detectó cambios en el comportamiento externo de las operaciones verificadas.

Las mejoras realizadas se concentraron en organización interna, reducción de duplicación, separación de responsabilidades y legibilidad.

No se buscó transformar el proyecto en una arquitectura más compleja. Se priorizaron modificaciones acotadas y justificadas por los problemas identificados durante el diagnóstico.