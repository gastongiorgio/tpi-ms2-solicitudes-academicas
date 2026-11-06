# Casos de prueba

Los mismos casos deberán verificarse sobre la versión inicial y la versión refactorizada.

| ID | Caso | Acción | Resultado esperado | Resultado inicial |
|---|---|---|---|---|
| CP-01 | Listar solicitudes | GET /solicitudes | HTTP 200 y listado de solicitudes | Cumple |
| CP-02 | Consultar solicitud existente | GET /solicitudes/1 | HTTP 200 y datos de la solicitud | Cumple |
| CP-03 | Consultar solicitud inexistente | GET con ID inexistente | HTTP 404 | Cumple |
| CP-04 | Crear solicitud válida | POST /solicitudes | HTTP 201 y solicitud creada | Cumple |
| CP-05 | Crear solicitud incompleta | POST sin campos obligatorios | HTTP 400 | Cumple |
| CP-06 | Cambiar estado válido | PATCH de estado | HTTP 200 y estado actualizado | Cumple |
| CP-07 | Cambiar a estado inválido | PATCH con estado no permitido | HTTP 400 | Cumple |
| CP-08 | Asignar responsable válido | PATCH de responsable | HTTP 200 y responsable asignado | Cumple |
| CP-09 | Asignar responsable inexistente | PATCH con ID inexistente | HTTP 400 | Cumple |
| CP-10 | Filtrar solicitudes | GET con query parameter | HTTP 200 y resultados filtrados | Cumple |

## Evidencias de la versión inicial

Las pruebas fueron ejecutadas sobre la versión previa al refactoring utilizando Postman.

Evidencias principales:

- `14-prueba-inicial-404.png`
- `15-prueba-inicial-post.png`
- `16-prueba-inicial-patch-estado.png`
- `17-prueba-inicial-estado-invalido.png`
- `18-prueba-inicial-responsable-invalido.png`
- `19-prueba-inicial-filtro.png`

Los diez casos definidos obtuvieron el resultado esperado.
