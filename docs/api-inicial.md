# API inicial - Sistema de Solicitudes Académicas

URL base local:

`http://localhost:3000`

## Estudiantes

### Listar estudiantes

**GET** `/estudiantes`

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "legajo": "50123",
    "email": "juan.perez@ejemplo.com"
  },
  {
    "id": 2,
    "nombre": "Lucía Gómez",
    "legajo": "50456",
    "email": "lucia.gomez@ejemplo.com"
  }
]
```

---

## Responsables

### Listar responsables

**GET** `/responsables`

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Laura Martínez",
    "area": "Departamento de Alumnos"
  },
  {
    "id": 2,
    "nombre": "Carlos Fernández",
    "area": "Secretaría Académica"
  }
]
```

---

## Solicitudes

### Listar solicitudes

**GET** `/solicitudes`

Permite filtrar por:

- estado
- prioridad
- tipo

Ejemplo:

```text
GET /solicitudes?estado=PENDIENTE
```

También pueden combinarse filtros:

```text
GET /solicitudes?estado=PENDIENTE&prioridad=ALTA
```

---

### Consultar una solicitud por ID

**GET** `/solicitudes/:id`

Ejemplo:

```text
GET /solicitudes/1
```

Si la solicitud no existe, la API devuelve:

```json
{
  "message": "Solicitud no encontrada"
}
```

---

### Crear una solicitud

**POST** `/solicitudes`

Body:

```json
{
  "tipo": "CERTIFICADO_ALUMNO_REGULAR",
  "descripcion": "Necesito el certificado para presentar en mi trabajo",
  "prioridad": "MEDIA",
  "estudianteId": 1
}
```

La solicitud nueva se crea automáticamente con:

```text
estado = PENDIENTE
responsableId = null
```

Ejemplo de respuesta:

```json
{
  "id": 2,
  "tipo": "CERTIFICADO_ALUMNO_REGULAR",
  "descripcion": "Necesito el certificado para presentar en mi trabajo",
  "prioridad": "MEDIA",
  "estado": "PENDIENTE",
  "estudianteId": 1,
  "responsableId": null
}
```

---

### Cambiar estado de una solicitud

**PATCH** `/solicitudes/:id/estado`

Ejemplo:

```text
PATCH /solicitudes/2/estado
```

Body:

```json
{
  "estado": "EN_PROCESO"
}
```

Estados permitidos:

- `PENDIENTE`
- `EN_PROCESO`
- `COMPLETADA`

Si se intenta utilizar otro estado, la API devuelve un error.

---

### Asignar responsable

**PATCH** `/solicitudes/:id/responsable`

Ejemplo:

```text
PATCH /solicitudes/2/responsable
```

Body:

```json
{
  "responsableId": 1
}
```

El responsable indicado debe existir.

---

## Prioridades permitidas

- `BAJA`
- `MEDIA`
- `ALTA`

---

## Tipos de solicitud previstos

- `CERTIFICADO_ALUMNO_REGULAR`
- `CONSTANCIA_MATERIAS`
- `EQUIVALENCIA`
- `OTRA`

---

## Resumen de endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verificar funcionamiento de la API |
| GET | `/estudiantes` | Listar estudiantes |
| GET | `/responsables` | Listar responsables |
| GET | `/solicitudes` | Listar y filtrar solicitudes |
| GET | `/solicitudes/:id` | Consultar solicitud por ID |
| POST | `/solicitudes` | Crear una solicitud |
| PATCH | `/solicitudes/:id/estado` | Cambiar estado |
| PATCH | `/solicitudes/:id/responsable` | Asignar responsable |