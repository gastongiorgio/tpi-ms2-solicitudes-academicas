const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Datos temporales en memoria

let estudiantes = [
  {
    id: 1,
    nombre: "Juan Pérez",
    legajo: "50123",
    email: "juan.perez@ejemplo.com",
  },
  {
    id: 2,
    nombre: "Lucía Gómez",
    legajo: "50456",
    email: "lucia.gomez@ejemplo.com",
  },
];

let responsables = [
  {
    id: 1,
    nombre: "Laura Martínez",
    area: "Departamento de Alumnos",
  },
  {
    id: 2,
    nombre: "Carlos Fernández",
    area: "Secretaría Académica",
  },
];

let solicitudes = [
  {
    id: 1,
    tipo: "CERTIFICADO_ALUMNO_REGULAR",
    descripcion: "Necesito presentar el certificado en mi trabajo.",
    prioridad: "MEDIA",
    estado: "PENDIENTE",
    estudianteId: 1,
    responsableId: null,
  },
];


// Health check

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API de Solicitudes Académicas funcionando",
  });
});


// Estudiantes

app.get("/estudiantes", (req, res) => {
  res.json(estudiantes);
});


// Responsables

app.get("/responsables", (req, res) => {
  res.json(responsables);
});


// Solicitudes

// Listar solicitudes y permitir filtros simples

app.get("/solicitudes", (req, res) => {
  const { estado, prioridad, tipo } = req.query;

  let resultado = solicitudes;

  if (estado) {
    resultado = resultado.filter(
      (solicitud) => solicitud.estado === estado
    );
  }

  if (prioridad) {
    resultado = resultado.filter(
      (solicitud) => solicitud.prioridad === prioridad
    );
  }

  if (tipo) {
    resultado = resultado.filter(
      (solicitud) => solicitud.tipo === tipo
    );
  }

  res.json(resultado);
});


// Consultar una solicitud por ID

app.get("/solicitudes/:id", (req, res) => {
  const id = Number(req.params.id);

  const solicitud = solicitudes.find(
    (solicitud) => solicitud.id === id
  );

  if (!solicitud) {
    return res.status(404).json({
      message: "Solicitud no encontrada",
    });
  }

  res.json(solicitud);
});


// Crear una solicitud

app.post("/solicitudes", (req, res) => {
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

  const estudiante = estudiantes.find(
    (estudiante) => estudiante.id === estudianteId
  );

  if (!estudiante) {
    return res.status(400).json({
      message: "El estudiante indicado no existe",
    });
  }

  const nuevaSolicitud = {
    id: solicitudes.length + 1,
    tipo,
    descripcion,
    prioridad,
    estado: "PENDIENTE",
    estudianteId,
    responsableId: null,
  };

  solicitudes.push(nuevaSolicitud);

  res.status(201).json(nuevaSolicitud);
});


// Cambiar estado

app.patch("/solicitudes/:id/estado", (req, res) => {
  const id = Number(req.params.id);
  const { estado } = req.body;

  const solicitud = solicitudes.find(
    (solicitud) => solicitud.id === id
  );

  if (!solicitud) {
    return res.status(404).json({
      message: "Solicitud no encontrada",
    });
  }

  if (
    estado !== "PENDIENTE" &&
    estado !== "EN_PROCESO" &&
    estado !== "COMPLETADA"
  ) {
    return res.status(400).json({
      message: "Estado inválido",
    });
  }

  solicitud.estado = estado;

  res.json(solicitud);
});


// Asignar responsable

app.patch("/solicitudes/:id/responsable", (req, res) => {
  const id = Number(req.params.id);
  const { responsableId } = req.body;

  const solicitud = solicitudes.find(
    (solicitud) => solicitud.id === id
  );

  if (!solicitud) {
    return res.status(404).json({
      message: "Solicitud no encontrada",
    });
  }

  const responsable = responsables.find(
    (responsable) => responsable.id === responsableId
  );

  if (!responsable) {
    return res.status(400).json({
      message: "El responsable indicado no existe",
    });
  }

  solicitud.responsableId = responsableId;

  res.json(solicitud);
});


// Inicio del servidor

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});