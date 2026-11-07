# Registro de uso de Inteligencia Artificial

## Herramienta utilizada

ChatGPT - OpenAI.

## Finalidad

La herramienta fue utilizada como apoyo durante distintas etapas del Trabajo Práctico Integrador.

Su utilización tuvo como finalidad:

- interpretar y organizar los requisitos de la consigna;
- definir un alcance adecuado para el sistema;
- orientar la organización inicial del proyecto;
- apoyar el desarrollo y comprensión de determinadas partes del código;
- colaborar en la identificación de problemas de calidad interna;
- proponer alternativas de refactoring;
- asistir durante el análisis de errores surgidos en el desarrollo;
- organizar los casos de prueba;
- colaborar en la redacción y ordenamiento de la documentación.

## Grado de intervención

La inteligencia artificial fue utilizada como herramienta de consulta y asistencia.

El equipo mantuvo la responsabilidad sobre:

- la selección del caso de estudio;
- la ejecución de los comandos;
- la creación y modificación de los archivos;
- la ejecución de la aplicación;
- las pruebas en frontend, backend y PostgreSQL;
- la verificación de los resultados;
- las decisiones sobre qué cambios incorporar;
- la revisión del código;
- la documentación incluida en el repositorio.

Las propuestas realizadas por la herramienta fueron verificadas durante el desarrollo antes de incorporarlas al proyecto.

## Interacciones relevantes

### 1. Interpretación de la consigna

Se utilizó ChatGPT para analizar los requisitos del Trabajo Práctico Integrador y organizar las etapas de trabajo.

A partir de este análisis se definió como caso de estudio un Sistema de Gestión de Solicitudes Académicas.

### 2. Definición del alcance

La herramienta colaboró en la definición de un sistema de complejidad acotada que permitiera trabajar sobre:

- calidad interna y externa;
- deuda técnica;
- code smells;
- principios SOLID;
- Clean Code;
- refactoring;
- pruebas;
- code review.

Se priorizó mantener un alcance sencillo para concentrar el trabajo en la mejora de calidad.

### 3. Organización del proyecto

Se utilizó IA como apoyo para organizar el proyecto en:

- backend con Node.js y Express;
- frontend con React;
- base de datos PostgreSQL;
- carpeta `docs` para documentación y evidencias.

### 4. Desarrollo e integración

La herramienta fue utilizada como guía durante la implementación e integración de algunas operaciones del backend, frontend y base de datos.

El equipo ejecutó cada cambio y verificó manualmente su funcionamiento.

### 5. Diagnóstico de calidad

Se utilizó IA como apoyo para revisar el estado inicial del sistema y organizar los problemas encontrados.

El diagnóstico final incluyó ocho hallazgos, entre ellos:

- exceso de responsabilidades;
- duplicación;
- valores de dominio repetidos;
- código muerto;
- acoplamiento de la interfaz con las llamadas HTTP;
- repetición de la URL de la API.

El equipo revisó los hallazgos y documentó su ubicación, impacto, riesgo y prioridad.

### 6. Refactoring

La herramienta colaboró en la planificación y explicación de los refactorings.

Entre las técnicas aplicadas se encuentran:

- eliminación de código muerto;
- Extract Constant;
- Move Method / reubicación de responsabilidades;
- Introduce Parameter Object o equivalente;
- Extract Method;
- Extract Module.

Los cambios fueron implementados y probados progresivamente.

### 7. Resolución de errores

Durante el refactoring se utilizó ChatGPT para analizar errores observados durante la ejecución.

Por ejemplo, se detectó un problema relacionado con el orden de carga de las variables de entorno y la inicialización de la conexión a PostgreSQL.

La corrección fue posteriormente probada por el equipo.

### 8. Pruebas

La herramienta ayudó a organizar diez casos de prueba funcionales y a definir qué resultados debían verificarse.

Las pruebas fueron ejecutadas manualmente mediante Postman tanto sobre la versión inicial como sobre la versión refactorizada.

Los resultados fueron registrados por el equipo en `docs/casos-prueba.md`.

### 9. Documentación

ChatGPT fue utilizado como apoyo para estructurar:

- diagnóstico;
- refactorings;
- casos de prueba;
- checklist de code review;
- README;
- registro de uso de IA;
- documentación final del trabajo.

## Criterio de uso

La inteligencia artificial no sustituyó la ejecución ni la validación del proyecto.

Su función fue actuar como herramienta de apoyo para analizar alternativas, detectar posibles errores, explicar conceptos y organizar la documentación.

Los integrantes deberán poder explicar durante la presentación las decisiones tomadas, los problemas detectados, los refactorings realizados y las pruebas ejecutadas.