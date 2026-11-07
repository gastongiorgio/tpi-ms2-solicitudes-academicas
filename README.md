# TPI - Metodología de Sistemas II

## Sistema de Gestión de Solicitudes Académicas

Proyecto desarrollado para el Trabajo Práctico Integrador de Metodología de Sistemas II.

El trabajo utiliza una aplicación funcional como caso de estudio para analizar su calidad interna, detectar problemas de diseño y aplicar refactorings conservando el comportamiento externo.

## Integrantes

- Gastón Armando Giorgio
- Matías Ariel Deluca
- Emanuel Andres Meshler

## Tecnologías utilizadas

- Backend: Node.js + Express
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Control de versiones: Git + GitHub
- Pruebas manuales de API: Postman

## Funcionalidades principales

El sistema permite:

- listar solicitudes académicas;
- consultar una solicitud;
- registrar nuevas solicitudes;
- filtrar solicitudes;
- modificar el estado de una solicitud;
- asignar responsables;
- consultar estudiantes;
- consultar responsables;
- almacenar la información en PostgreSQL.

## Estructura general

```text
backend/
  src/
    constants/
    repositories/
    app.js
    db.js

frontend/
  src/
    services/
    App.jsx

database/
  schema.sql
  seed.sql

docs/
  evidencias/
  api-inicial.md
  casos-prueba.md
  code-review.md
  diagnostico.md
  ia.md
  refactorings.md
```

## Ejecución del proyecto

### 1. Base de datos

Crear una base de datos PostgreSQL para el proyecto.

Luego ejecutar:

```text
database/schema.sql
database/seed.sql
```

El primer archivo crea las tablas y relaciones necesarias.

El segundo agrega datos iniciales para utilizar la aplicación.

### 2. Variables de entorno del backend

Crear:

```text
backend/.env
```

con la configuración local de PostgreSQL:

```text
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=solicitudes_academicas
DB_USER=postgres
DB_PASSWORD=contraseña_local
```

El archivo `.env` no debe almacenarse en Git.

### 3. Backend

Desde la carpeta `backend`:

```bash
npm install
npm run dev
```

La API se ejecuta por defecto en:

```text
http://localhost:3000
```

### 4. Frontend

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local del frontend.

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verificar funcionamiento de la API |
| GET | `/estudiantes` | Listar estudiantes |
| GET | `/responsables` | Listar responsables |
| GET | `/solicitudes` | Listar y filtrar solicitudes |
| GET | `/solicitudes/:id` | Consultar una solicitud |
| POST | `/solicitudes` | Crear una solicitud |
| PATCH | `/solicitudes/:id/estado` | Modificar estado |
| PATCH | `/solicitudes/:id/responsable` | Asignar responsable |

## Proceso de mejora

El trabajo se desarrolló conservando una versión inicial funcional antes de realizar los cambios internos.

Las principales etapas fueron:

1. construcción e integración de la versión inicial;
2. diagnóstico de problemas de calidad;
3. ejecución de pruebas iniciales;
4. aplicación de refactorings;
5. repetición de las mismas pruebas;
6. comparación de resultados;
7. code review y documentación.

## Problemas detectados

Durante el diagnóstico se registraron ocho problemas o debilidades, entre ellos:

- exceso de responsabilidades en archivos principales;
- consultas y lógica repetida;
- manejo de errores repetido;
- valores de dominio escritos directamente;
- código muerto;
- exceso de responsabilidades en `App.jsx`;
- repetición de llamadas para actualizar solicitudes;
- URL de API repetida.

El detalle se encuentra en:

```text
docs/diagnostico.md
```

## Refactorings realizados

Entre las mejoras aplicadas se encuentran:

- eliminación de código muerto;
- centralización de estados;
- extracción de validaciones;
- agrupación de parámetros relacionados;
- creación de un repositorio para solicitudes;
- centralización de la comunicación del frontend con la API.

El detalle se encuentra en:

```text
docs/refactorings.md
```

## Pruebas

Se definieron diez casos de prueba.

Los mismos casos fueron ejecutados sobre:

- la versión inicial;
- la versión refactorizada.

Los diez casos obtuvieron el resultado esperado en ambas versiones.

Esto permitió comprobar que los cambios internos no modificaron el comportamiento externo verificado.

Los resultados se encuentran en:

```text
docs/casos-prueba.md
```

## Code Review

La versión refactorizada fue revisada mediante un checklist que contempla:

- legibilidad;
- responsabilidades;
- duplicación;
- manejo de errores;
- base de datos;
- frontend;
- pruebas;
- documentación.

El resultado se encuentra en:

```text
docs/code-review.md
```

## Uso de Inteligencia Artificial

Durante el trabajo se utilizó ChatGPT como herramienta de apoyo para análisis, orientación técnica, resolución de errores, organización de pruebas y documentación.

El uso y grado de intervención se encuentran declarados en:

```text
docs/ia.md
```

## Evidencias

Las capturas utilizadas para documentar las distintas etapas se encuentran en:

```text
docs/evidencias/
```

Incluyen evidencias de:

- integración;
- diagnóstico;
- tags;
- pruebas iniciales;
- refactoring;
- pruebas posteriores al refactoring;
- Pull Requests y revisiones.

## Versiones y etapas

El repositorio utiliza tags para conservar estados relevantes del trabajo:

```text
estado-inicial
etapa-diagnostico
etapa-refactoring
etapa-pruebas
estadorefactorizado
```

Estos tags permiten consultar el sistema antes y después de las mejoras y los principales hitos del proceso.