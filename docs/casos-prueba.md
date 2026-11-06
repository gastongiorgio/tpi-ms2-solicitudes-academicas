# Casos de prueba

Los mismos casos deberán verificarse sobre la versión inicial y la versión refactorizada.

| ID | Caso | Acción | Resultado esperado |
|---|---|---|---|
| CP-01 | Listar solicitudes | GET /solicitudes | HTTP 200 y listado de solicitudes |
| CP-02 | Consultar solicitud existente | GET /solicitudes/1 | HTTP 200 y datos de la solicitud |
| CP-03 | Consultar solicitud inexistente | GET con ID inexistente | HTTP 404 |
| CP-04 | Crear solicitud válida | POST /solicitudes | HTTP 201 y solicitud creada |
| CP-05 | Crear solicitud incompleta | POST sin campos obligatorios | HTTP 400 |
| CP-06 | Cambiar estado válido | PATCH de estado | HTTP 200 y estado actualizado |
| CP-07 | Cambiar a estado inválido | PATCH con estado no permitido | HTTP 400 |
| CP-08 | Asignar responsable válido | PATCH de responsable | HTTP 200 y responsable asignado |
| CP-09 | Asignar responsable inexistente | PATCH con ID inexistente | HTTP 400 |
| CP-10 | Filtrar solicitudes | GET con query parameter | HTTP 200 y resultados filtrados |