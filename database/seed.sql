
-- =====================================================
-- Proyecto: Sistema de Gestión de Solicitudes Académicas
-- Archivo: seed.sql
-- Descripción: Datos iniciales ficticios para pruebas
-- =====================================================

-- -----------------------------------------------------
-- 1. Estudiantes
-- -----------------------------------------------------

INSERT INTO estudiantes (nombre, legajo, email)
VALUES
    ('Juan Perez', 'EST1001', 'juan.perez@example.com'),
    ('Maria Gomez', 'EST1002', 'maria.gomez@example.com'),
    ('Lucas Fernandez', 'EST1003', 'lucas.fernandez@example.com')
ON CONFLICT DO NOTHING;


-- -----------------------------------------------------
-- 2. Responsables
-- -----------------------------------------------------

INSERT INTO responsables (nombre, area, email)
VALUES
    ('Laura Martinez', 'Alumnado', 'laura.martinez@example.com'),
    ('Carlos Rodriguez', 'Secretaria Academica', 'carlos.rodriguez@example.com')
ON CONFLICT DO NOTHING;


-- -----------------------------------------------------
-- 3. Solicitudes academicas
-- -----------------------------------------------------

-- Solicitud 1: Certificado de alumno regular
INSERT INTO solicitudes (
    tipo, descripcion, prioridad, estado, fecha,
    estudiante_id, responsable_id
)
SELECT
    'Certificado de alumno regular',
    'Solicitud de certificado para presentar en el trabajo.',
    'MEDIA',
    'PENDIENTE',
    CURRENT_DATE,
    e.id,
    r.id
FROM estudiantes e
JOIN responsables r
    ON r.email = 'laura.martinez@example.com'
WHERE e.legajo = 'EST1001'
AND NOT EXISTS (
    SELECT 1 FROM solicitudes s
    WHERE s.tipo = 'Certificado de alumno regular'
      AND s.estudiante_id = e.id
);

-- Solicitud 2: Constancia de materias aprobadas
INSERT INTO solicitudes (
    tipo, descripcion, prioridad, estado, fecha,
    estudiante_id, responsable_id
)
SELECT
    'Constancia de materias aprobadas',
    'Solicitud de constancia para presentar en otra institucion.',
    'ALTA',
    'EN_PROCESO',
    CURRENT_DATE - 2,
    e.id,
    r.id
FROM estudiantes e
JOIN responsables r
    ON r.email = 'carlos.rodriguez@example.com'
WHERE e.legajo = 'EST1002'
AND NOT EXISTS (
    SELECT 1 FROM solicitudes s
    WHERE s.tipo = 'Constancia de materias aprobadas'
      AND s.estudiante_id = e.id
);

-- Solicitud 3: Equivalencia
INSERT INTO solicitudes (
    tipo, descripcion, prioridad, estado, fecha,
    estudiante_id, responsable_id
)
SELECT
    'Equivalencia',
    'Solicitud de reconocimiento de materias aprobadas en otra carrera.',
    'ALTA',
    'PENDIENTE',
    CURRENT_DATE - 1,
    e.id,
    r.id
FROM estudiantes e
JOIN responsables r
    ON r.email = 'carlos.rodriguez@example.com'
WHERE e.legajo = 'EST1003'
AND NOT EXISTS (
    SELECT 1 FROM solicitudes s
    WHERE s.tipo = 'Equivalencia'
      AND s.estudiante_id = e.id
);

-- Solicitud 4: Otra solicitud academica
INSERT INTO solicitudes (
    tipo, descripcion, prioridad, estado, fecha,
    estudiante_id, responsable_id
)
SELECT
    'Otra solicitud academica',
    'Consulta sobre fechas de examenes finales.',
    'BAJA',
    'COMPLETADA',
    CURRENT_DATE - 5,
    e.id,
    r.id
FROM estudiantes e
JOIN responsables r
    ON r.email = 'laura.martinez@example.com'
WHERE e.legajo = 'EST1001'
AND NOT EXISTS (
    SELECT 1 FROM solicitudes s
    WHERE s.tipo = 'Otra solicitud academica'
      AND s.estudiante_id = e.id
);

-- Solicitud 5: Sin responsable asignado
INSERT INTO solicitudes (
    tipo, descripcion, prioridad, estado, fecha,
    estudiante_id, responsable_id
)
SELECT
    'Certificado de alumno regular',
    'Segunda solicitud de certificado para tramite personal.',
    'MEDIA',
    'PENDIENTE',
    CURRENT_DATE,
    e.id,
    NULL
FROM estudiantes e
WHERE e.legajo = 'EST1002'
AND NOT EXISTS (
    SELECT 1 FROM solicitudes s
    WHERE s.descripcion = 'Segunda solicitud de certificado para tramite personal.'
      AND s.estudiante_id = e.id
);
