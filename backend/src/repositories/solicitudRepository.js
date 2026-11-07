const pool = require("../db");


async function listar(filtros) {
  const { estado, prioridad, tipo } = filtros;

  let consulta = `
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
    WHERE 1 = 1
  `;

  const valores = [];

  if (estado) {
    valores.push(estado);
    consulta += ` AND s.estado = $${valores.length}`;
  }

  if (prioridad) {
    valores.push(prioridad);
    consulta += ` AND s.prioridad = $${valores.length}`;
  }

  if (tipo) {
    valores.push(tipo);
    consulta += ` AND s.tipo = $${valores.length}`;
  }

  consulta += " ORDER BY s.id";

  const resultado = await pool.query(consulta, valores);

  return resultado.rows;
}


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


async function cambiarEstado(id, estado) {
  const resultado = await pool.query(
    `
    UPDATE solicitudes
    SET estado = $1
    WHERE id = $2
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
    [estado, id]
  );

  return resultado.rows[0];
}


async function asignarResponsable(id, responsableId) {
  const resultado = await pool.query(
    `
    UPDATE solicitudes
    SET responsable_id = $1
    WHERE id = $2
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
    [responsableId, id]
  );

  return resultado.rows[0];
}


module.exports = {
  listar,
  obtenerPorId,
  crear,
  cambiarEstado,
  asignarResponsable,
};