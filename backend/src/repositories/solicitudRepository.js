const pool = require("../db");

async function obtenerPorId(id) {
  const resultado = await pool.query(
    `
    SELECT
      s.id,
      s.tipo,
      s.descripcion,
      s.prioridad,
      s.estado,
      s.fecha,
      s.estudiante_id AS "estudianteId",
      s.responsable_id AS "responsableId",
      e.nombre AS estudiante,
      r.nombre AS responsable
    FROM solicitudes s
    JOIN estudiantes e ON e.id = s.estudiante_id
    LEFT JOIN responsables r ON r.id = s.responsable_id
    WHERE s.id = $1
    `,
    [id]
  );

  return resultado.rows[0];
}


async function crear(datosSolicitud) {
  const {
    tipo,
    descripcion,
    prioridad,
    estudianteId,
  } = datosSolicitud;

  const resultado = await pool.query(
    `
    INSERT INTO solicitudes (
      tipo,
      descripcion,
      prioridad,
      estado,
      estudiante_id,
      responsable_id
    )
    VALUES ($1, $2, $3, 'PENDIENTE', $4, NULL)
    RETURNING
      id,
      tipo,
      descripcion,
      prioridad,
      estado,
      fecha,
      estudiante_id AS "estudianteId",
      responsable_id AS "responsableId"
    `,
    [tipo, descripcion, prioridad, estudianteId]
  );

  return resultado.rows[0];
}

module.exports = {
  obtenerPorId,
  crear,
};