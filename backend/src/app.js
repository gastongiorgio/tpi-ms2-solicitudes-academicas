const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API de Solicitudes Académicas funcionando",
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});