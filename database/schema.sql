
-- =====================================================
-- Proyecto: Sistema de Gestión de Solicitudes Académicas
-- Archivo: schema.sql
-- Descripción: Creación de la estructura de la base de datos
-- =====================================================

-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    legajo VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE
);

-- Tabla de responsables
CREATE TABLE IF NOT EXISTS responsables (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

-- Tabla de solicitudes académicas
CREATE TABLE IF NOT EXISTS solicitudes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,

    prioridad VARCHAR(10) NOT NULL
        CHECK (prioridad IN ('BAJA', 'MEDIA', 'ALTA')),

    estado VARCHAR(15) NOT NULL DEFAULT 'PENDIENTE'
        CHECK (estado IN ('PENDIENTE', 'EN_PROCESO', 'COMPLETADA')),

    fecha DATE NOT NULL DEFAULT CURRENT_DATE,

    estudiante_id INTEGER NOT NULL,
    responsable_id INTEGER,

    CONSTRAINT fk_solicitudes_estudiantes
        FOREIGN KEY (estudiante_id)
        REFERENCES estudiantes(id),

    CONSTRAINT fk_solicitudes_responsables
        FOREIGN KEY (responsable_id)
        REFERENCES responsables(id)
);

-- Índices para optimizar consultas y filtros
CREATE INDEX IF NOT EXISTS idx_solicitudes_estudiante
    ON solicitudes(estudiante_id);

CREATE INDEX IF NOT EXISTS idx_solicitudes_responsable
    ON solicitudes(responsable_id);

CREATE INDEX IF NOT EXISTS idx_solicitudes_estado
    ON solicitudes(estado);

CREATE INDEX IF NOT EXISTS idx_solicitudes_prioridad
    ON solicitudes(prioridad);
