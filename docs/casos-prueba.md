# Casos de prueba

Los mismos casos de prueba fueron ejecutados sobre la versión inicial y sobre la versión refactorizada para comprobar que las mejoras internas no modificaran el comportamiento externo del sistema.

| ID | Caso | Acción | Resultado esperado | Resultado inicial | Resultado refactorizado |
|---|---|---|---|---|---|
| CP-01 | Listar solicitudes | GET /solicitudes | HTTP 200 y listado de solicitudes | Cumple | Cumple |
| CP-02 | Consultar solicitud existente | GET /solicitudes/1 | HTTP 200 y datos de la solicitud | Cumple | Cumple |
| CP-03 | Consultar solicitud inexistente | GET con ID inexistente | HTTP 404 | Cumple | Cumple |
| CP-04 | Crear solicitud válida | POST /solicitudes | HTTP 201 y solicitud creada | Cumple | Cumple |
| CP-05 | Crear solicitud incompleta | POST sin campos obligatorios | HTTP 400 | Cumple | Cumple |
| CP-06 | Cambiar estado válido | PATCH de estado | HTTP 200 y estado actualizado | Cumple | Cumple |
| CP-07 | Cambiar a estado inválido | PATCH con estado no permitido | HTTP 400 | Cumple | Cumple |
| CP-08 | Asignar responsable válido | PATCH de responsable | HTTP 200 y responsable asignado | Cumple | Cumple |
| CP-09 | Asignar responsable inexistente | PATCH con ID inexistente | HTTP 400 | Cumple | Cumple |
| CP-10 | Filtrar solicitudes | GET con query parameter | HTTP 200 y resultados filtrados | Cumple | Cumple |

## Evidencias de la versión inicial

Las pruebas de la versión inicial fueron ejecutadas antes de comenzar el refactoring utilizando Postman.

Evidencias principales:

- `14-prueba-inicial-404.png`
- `15-prueba-inicial-post.png`
- `16-prueba-inicial-patch-estado.png`
- `17-prueba-inicial-estado-invalido.png`
- `18-prueba-inicial-responsable-invalido.png`
- `19-prueba-inicial-filtro.png`
- `20-resultados-pruebas-iniciales-1.png`
- `21-resultados-pruebas-iniciales-2.png`

Los diez casos obtuvieron el resultado esperado.

## Evidencias de la versión refactorizada

Luego de finalizar los refactorings se ejecutaron nuevamente los mismos diez casos utilizando Postman.

Evidencias principales:

- `29-prueba-refactorizada-404.png`
- `30-prueba-refactorizada-creacion.png`
- `31-prueba-refactorizada-estado-invalido.png`
- `32-prueba-refactorizada-filtro.png`

Los diez casos volvieron a obtener el resultado esperado.

## Comparación antes y después

La comparación de resultados muestra que los diez casos definidos presentan el mismo comportamiento esperado antes y después del refactoring.

Las mejoras realizadas modificaron la estructura interna del código, pero conservaron:

- los endpoints disponibles;
- los códigos de estado HTTP esperados;
- las validaciones principales;
- la creación y actualización de solicitudes;
- la asignación de responsables;
- el filtrado de solicitudes;
- el funcionamiento general del frontend.

Por lo tanto, las pruebas realizadas permiten verificar que el comportamiento externo del sistema se mantuvo después de las mejoras de calidad interna.