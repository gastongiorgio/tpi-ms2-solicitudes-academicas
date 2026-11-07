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


// Validaciones

function faltanDatosObligatorios(datosSolicitud) {
  const {
    tipo,
    descripcion,
    prioridad,
    estudianteId,
  } = datosSolicitud;

  return !tipo || !descripcion || !prioridad || !estudianteId;
}


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

app.get("/solicitudes", async (req, res) => {
  try {
    const solicitudes = await solicitudRepository.listar(req.query);

    res.json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error.message);

    res.status(500).json({
      message: "Error al obtener solicitudes",
    });
  }
});


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


app.post("/solicitudes", async (req, res) => {
  try {
    const datosSolicitud = req.body;

    if (faltanDatosObligatorios(datosSolicitud)) {
      return res.status(400).json({
        message: "Faltan datos obligatorios",
      });
    }

    const estudiante = await pool.query(
      "SELECT * FROM estudiantes WHERE id = $1",
      [datosSolicitud.estudianteId]
    );

    if (estudiante.rows.length === 0) {
      return res.status(400).json({
        message: "El estudiante indicado no existe",
      });
    }

    const solicitud = await solicitudRepository.crear(datosSolicitud);

    res.status(201).json(solicitud);
  } catch (error) {
    console.error("Error al crear la solicitud:", error.message);

    res.status(500).json({
      message: "Error al crear la solicitud",
    });
  }
});


app.patch("/solicitudes/:id/estado", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if (!ESTADOS_SOLICITUD.includes(estado)) {
      return res.status(400).json({
        message: "Estado inválido",
      });
    }

    const solicitud = await solicitudRepository.cambiarEstado(
      id,
      estado
    );

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    res.json(solicitud);
  } catch (error) {
    console.error("Error al cambiar el estado:", error.message);

    res.status(500).json({
      message: "Error al cambiar el estado",
    });
  }
});


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

    const solicitud = await solicitudRepository.asignarResponsable(
      id,
      responsableId
    );

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    res.json(solicitud);
  } catch (error) {
    console.error("Error al asignar responsable:", error.message);

    res.status(500).json({
      message: "Error al asignar responsable",
    });
  }
});


// Verificar conexión con PostgreSQL

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