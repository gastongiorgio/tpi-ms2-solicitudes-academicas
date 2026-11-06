# Diagnóstico de calidad interna

Este documento registra los problemas técnicos encontrados en la versión inicial del Sistema de Gestión de Solicitudes Académicas.

El diagnóstico definitivo se realizará sobre la versión identificada con el tag `estado-inicial`.

| # | Code smell / problema | Ubicación | Evidencia | Impacto | Riesgo | Prioridad |
|---|---|---|---|---|---|---|
| 1 | Archivo con demasiadas responsabilidades / violación de SRP | `backend/src/app.js` | El mismo archivo configura Express, define rutas, valida datos, ejecuta consultas SQL, maneja errores y arranca el servidor. | Dificulta entender, modificar y probar cada responsabilidad por separado. | Alto | Alta |
| 2 | Duplicación de consultas SQL | `backend/src/app.js` | Las rutas `GET /solicitudes`, `GET /solicitudes/:id`, `POST`, `PATCH /estado` y `PATCH /responsable` repiten fragmentos de SQL y columnas de retorno. | Aumenta la posibilidad de inconsistencias y obliga a modificar varios lugares ante cambios en la estructura de datos. | Medio | Alta |
| 3 | Manejo de errores repetido | `backend/src/app.js` | Varias rutas repiten bloques `try/catch`, mensajes por consola y respuestas HTTP 500 con una estructura muy similar. | Genera duplicación y hace más costoso mantener una política de errores consistente. | Medio | Media |
| 4 | Strings mágicos y valores de dominio repetidos | `backend/src/app.js` y `frontend/src/App.jsx` | Estados como `"PENDIENTE"`, `"EN_PROCESO"` y `"COMPLETADA"` aparecen escritos directamente en distintos bloques del código. | Un cambio en los valores permitidos obliga a modificar varios lugares y aumenta el riesgo de errores por inconsistencias. | Medio | Media |
| 5 | Código muerto / datos temporales sin uso | `backend/src/app.js` | Permanecen definidos los arrays `estudiantes`, `responsables` y `solicitudes`, aunque las rutas ya consultan PostgreSQL. | Confunde sobre cuál es la fuente real de datos y agrega código que ya no cumple ninguna función. | Bajo | Media |
| 6 | Componente frontend con demasiadas responsabilidades | `frontend/src/App.jsx` | El componente carga datos, administra formularios, aplica filtros, realiza peticiones HTTP, actualiza estado y renderiza toda la interfaz. | Reduce la legibilidad y dificulta modificar o probar partes de la interfaz de forma aislada. | Alto | Alta |
| 7 | Duplicación de llamadas para recargar solicitudes | `frontend/src/App.jsx` | Después de crear una solicitud, cambiar su estado o asignar un responsable se repite la llamada `fetch("http://localhost:3000/solicitudes")` y la actualización del estado. | Duplica lógica y obliga a repetir cambios si se modifica la forma de obtener las solicitudes. | Medio | Alta |
| 8 | URL de la API repetida y acoplada al entorno local | `frontend/src/App.jsx` | La cadena `http://localhost:3000` aparece escrita directamente en distintas llamadas `fetch`. | Dificulta cambiar de entorno o puerto y aumenta la posibilidad de dejar URLs inconsistentes. | Medio | Media |