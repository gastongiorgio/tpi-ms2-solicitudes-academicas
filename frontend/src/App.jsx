import { useEffect, useState } from "react";
import "./App.css";

import {
  obtenerSolicitudes,
  obtenerEstudiantes,
  obtenerResponsables,
  crearSolicitud as crearSolicitudApi,
  cambiarEstadoSolicitud,
  asignarResponsableSolicitud,
} from "./services/api";


const formularioInicial = {
  estudianteId: "",
  tipo: "",
  descripcion: "",
  prioridad: "MEDIA",
};


function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroPrioridad, setFiltroPrioridad] = useState("TODAS");


  async function cargarSolicitudes() {
    const datos = await obtenerSolicitudes();
    setSolicitudes(datos);
  }


  useEffect(() => {
    cargarSolicitudes().catch((error) => {
      console.error("Error al cargar solicitudes:", error);
    });
  }, []);


  useEffect(() => {
    obtenerEstudiantes()
      .then((datos) => {
        setEstudiantes(datos);
      })
      .catch((error) => {
        console.error("Error al cargar estudiantes:", error);
      });
  }, []);


  useEffect(() => {
    obtenerResponsables()
      .then((datos) => {
        setResponsables(datos);
      })
      .catch((error) => {
        console.error("Error al cargar responsables:", error);
      });
  }, []);


  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const coincideEstado =
      filtroEstado === "TODOS" || solicitud.estado === filtroEstado;

    const coincidePrioridad =
      filtroPrioridad === "TODAS" ||
      solicitud.prioridad === filtroPrioridad;

    return coincideEstado && coincidePrioridad;
  });


  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }


  async function crearSolicitud(evento) {
    evento.preventDefault();

    if (
      !formulario.estudianteId ||
      !formulario.tipo ||
      !formulario.descripcion.trim()
    ) {
      alert("Completá todos los campos obligatorios.");
      return;
    }

    try {
      const datosSolicitud = {
        tipo: formulario.tipo,
        descripcion: formulario.descripcion.trim(),
        prioridad: formulario.prioridad,
        estudianteId: Number(formulario.estudianteId),
      };

      await crearSolicitudApi(datosSolicitud);

      await cargarSolicitudes();

      setFormulario(formularioInicial);
    } catch (error) {
      console.error("Error al crear solicitud:", error);
      alert("Ocurrió un error al crear la solicitud.");
    }
  }


  async function actualizarEstado(id, estado) {
    try {
      await cambiarEstadoSolicitud(id, estado);

      await cargarSolicitudes();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Ocurrió un error al actualizar el estado.");
    }
  }


  async function actualizarResponsable(id, responsableId) {
    try {
      await asignarResponsableSolicitud(
        id,
        Number(responsableId)
      );

      await cargarSolicitudes();
    } catch (error) {
      console.error("Error al asignar responsable:", error);
      alert("Ocurrió un error al asignar el responsable.");
    }
  }


  return (
    <div className="app">
      <header className="encabezado">
        <div className="contenedor">
          <p className="subtitulo">Metodología de Sistemas II</p>

          <h1>Sistema de Gestión de Solicitudes Académicas</h1>

          <p>
            Registro, seguimiento y administración de solicitudes
            estudiantiles.
          </p>
        </div>
      </header>

      <main className="contenedor contenido">
        <section className="resumen">
          <div className="tarjeta-resumen">
            <span>Total de solicitudes</span>
            <strong>{solicitudes.length}</strong>
          </div>

          <div className="tarjeta-resumen">
            <span>Pendientes</span>
            <strong>
              {solicitudes.filter((s) => s.estado === "PENDIENTE").length}
            </strong>
          </div>

          <div className="tarjeta-resumen">
            <span>En proceso</span>
            <strong>
              {solicitudes.filter((s) => s.estado === "EN_PROCESO").length}
            </strong>
          </div>

          <div className="tarjeta-resumen">
            <span>Completadas</span>
            <strong>
              {solicitudes.filter((s) => s.estado === "COMPLETADA").length}
            </strong>
          </div>
        </section>

        <section className="panel">
          <div className="titulo-seccion">
            <h2>Nueva solicitud</h2>
            <p>Completá los datos para registrar una solicitud académica.</p>
          </div>

          <form onSubmit={crearSolicitud} className="formulario">
            <div className="campo">
              <label htmlFor="estudiante">Estudiante</label>

              <select
                id="estudiante"
                name="estudianteId"
                value={formulario.estudianteId}
                onChange={manejarCambio}
                required
              >
                <option value="">Seleccionar estudiante</option>

                {estudiantes.map((estudiante) => (
                  <option key={estudiante.id} value={estudiante.id}>
                    {estudiante.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="tipo">Tipo de solicitud</label>

              <select
                id="tipo"
                name="tipo"
                value={formulario.tipo}
                onChange={manejarCambio}
                required
              >
                <option value="">Seleccionar tipo</option>

                <option value="Certificado de alumno regular">
                  Certificado de alumno regular
                </option>

                <option value="Constancia de materias aprobadas">
                  Constancia de materias aprobadas
                </option>

                <option value="Equivalencia">
                  Equivalencia
                </option>

                <option value="Otra solicitud académica">
                  Otra solicitud académica
                </option>
              </select>
            </div>

            <div className="campo campo-completo">
              <label htmlFor="descripcion">Descripción</label>

              <textarea
                id="descripcion"
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Describí el motivo de la solicitud..."
                rows="3"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="prioridad">Prioridad</label>

              <select
                id="prioridad"
                name="prioridad"
                value={formulario.prioridad}
                onChange={manejarCambio}
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="campo campo-boton">
              <button type="submit" className="boton">
                Registrar solicitud
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="titulo-seccion">
            <h2>Listado de solicitudes</h2>
            <p>Consultá y actualizá las solicitudes registradas.</p>
          </div>

          <div className="filtros">
            <div className="campo">
              <label htmlFor="filtroEstado">
                Filtrar por estado
              </label>

              <select
                id="filtroEstado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="TODOS">Todos los estados</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_PROCESO">En proceso</option>
                <option value="COMPLETADA">Completada</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="filtroPrioridad">
                Filtrar por prioridad
              </label>

              <select
                id="filtroPrioridad"
                value={filtroPrioridad}
                onChange={(e) => setFiltroPrioridad(e.target.value)}
              >
                <option value="TODAS">
                  Todas las prioridades
                </option>

                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
          </div>

          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Estudiante</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                </tr>
              </thead>

              <tbody>
                {solicitudesFiltradas.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td>#{solicitud.id}</td>
                    <td>{solicitud.tipo}</td>
                    <td>{solicitud.estudiante}</td>

                    <td>
                      <span
                        className={`prioridad ${solicitud.prioridad.toLowerCase()}`}
                      >
                        {solicitud.prioridad}
                      </span>
                    </td>

                    <td>
                      <select
                        aria-label={`Estado de solicitud ${solicitud.id}`}
                        value={solicitud.estado}
                        onChange={(e) =>
                          actualizarEstado(
                            solicitud.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="PENDIENTE">
                          Pendiente
                        </option>

                        <option value="EN_PROCESO">
                          En proceso
                        </option>

                        <option value="COMPLETADA">
                          Completada
                        </option>
                      </select>
                    </td>

                    <td>
                      <select
                        aria-label={`Responsable de solicitud ${solicitud.id}`}
                        value={solicitud.responsableId || ""}
                        onChange={(e) =>
                          actualizarResponsable(
                            solicitud.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Sin asignar</option>

                        {responsables.map((responsable) => (
                          <option
                            key={responsable.id}
                            value={responsable.id}
                          >
                            {responsable.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {solicitudesFiltradas.length === 0 && (
              <p className="sin-resultados">
                No se encontraron solicitudes con esos filtros.
              </p>
            )}
          </div>
        </section>

        <p className="nota">
          Los datos se almacenan en PostgreSQL a través de la API.
        </p>
      </main>
    </div>
  );
}

export default App;