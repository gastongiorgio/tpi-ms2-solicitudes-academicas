require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./db");
const ESTADOS_SOLICITUD = require("./constants/estadosSolicitud");
const solicitudRepository = require("./repositories/solicitudRepository");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Health check

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API de Solicitudes Académicas funcionando",
  });
});


// Estudiantes

app.get("/estudiantes", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM estudiantes ORDER BY id"
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener estudiantes:", error.message);

    res.status(500).json({
      message: "Error al obtener estudiantes",
    });
  }
});


// Responsables

app.get("/responsables", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM responsables ORDER BY id"
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener responsables:", error.message);

    res.status(500).json({
      message: "Error al obtener responsables",
    });
  }
});


// Solicitudes

// Listar solicitudes y permitir filtros simples

app.get("/solicitudes", async (req, res) => {
  try {
    const { estado, prioridad, tipo } = req.query;

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

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error.message);

    res.status(500).json({
      message: "Error al obtener solicitudes",
    });
  }
});


// Consultar una solicitud por ID

app.get("/solicitudes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const solicitud = await solicitudRepository.obtenerPorId(id);

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    res.json(solicitud);
  } catch (error) {
    console.error("Error al obtener la solicitud:", error.message);

    res.status(500).json({
      message: "Error al obtener la solicitud",
    });
  }
});


// Crear una solicitud

app.post("/solicitudes", async (req, res) => {
  try {
    const {
      tipo,
      descripcion,
      prioridad,
      estudianteId,
    } = req.body;

    if (!tipo || !descripcion || !prioridad || !estudianteId) {
      return res.status(400).json({
        message: "Faltan datos obligatorios",
      });
    }

    const estudiante = await pool.query(
      "SELECT * FROM estudiantes WHERE id = $1",
      [estudianteId]
    );

    if (estudiante.rows.length === 0) {
      return res.status(400).json({
        message: "El estudiante indicado no existe",
      });
    }

    const datosSolicitud = {
      tipo,
      descripcion,
      prioridad,
      estudianteId,
    };

    const solicitud = await solicitudRepository.crear(datosSolicitud);

    res.status(201).json(solicitud);
  } catch (error) {
    console.error("Error al crear la solicitud:", error.message);

    res.status(500).json({
      message: "Error al crear la solicitud",
    });
  }
});


// Cambiar estado

app.patch("/solicitudes/:id/estado", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if (!ESTADOS_SOLICITUD.includes(estado)) {
      return res.status(400).json({
        message: "Estado inválido",
      });
    }

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

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al cambiar el estado:", error.message);

    res.status(500).json({
      message: "Error al cambiar el estado",
    });
  }
});


// Asignar responsable

app.patch("/solicitudes/:id/responsable", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { responsableId } = req.body;

    const responsable = await pool.query(
      "SELECT * FROM responsables WHERE id = $1",
      [responsableId]
    );

    if (responsable.rows.length === 0) {
      return res.status(400).json({
        message: "El responsable indicado no existe",
      });
    }

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

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al asignar responsable:", error.message);

    res.status(500).json({
      message: "Error al asignar responsable",
    });
  }
});


pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Conexión a PostgreSQL correcta");
  })
  .catch((error) => {
    console.error("Error al conectar con PostgreSQL:", error.message);
  });


// Inicio del servidor

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});