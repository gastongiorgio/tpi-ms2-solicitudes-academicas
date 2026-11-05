
import { useState } from "react";
import "./App.css";

const solicitudesIniciales = [
  {
    id: 1,
    estudiante: "Estudiante Demo 1",
    tipo: "Certificado de alumno regular",
    descripcion: "Necesita el certificado para presentar en una institución.",
    prioridad: "MEDIA",
    estado: "PENDIENTE",
    responsable: "Sin asignar",
  },
  {
    id: 2,
    estudiante: "Estudiante Demo 2",
    tipo: "Equivalencia",
    descripcion: "Solicita equivalencia de materias.",
    prioridad: "ALTA",
    estado: "EN_PROCESO",
    responsable: "Secretaría Académica",
  },
  {
    id: 3,
    estudiante: "Estudiante Demo 3",
    tipo: "Constancia de materias aprobadas",
    descripcion: "Solicita una constancia actualizada.",
    prioridad: "BAJA",
    estado: "COMPLETADA",
    responsable: "Coordinación",
  },
];

const formularioInicial = {
  estudiante: "",
  tipo: "",
  descripcion: "",
  prioridad: "MEDIA",
};

function App() {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroPrioridad, setFiltroPrioridad] = useState("TODAS");

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

  function crearSolicitud(evento) {
    evento.preventDefault();

    if (
      !formulario.estudiante ||
      !formulario.tipo ||
      !formulario.descripcion.trim()
    ) {
      alert("Completá todos los campos obligatorios.");
      return;
    }

    const nuevoId =
      Math.max(0, ...solicitudes.map((solicitud) => solicitud.id)) + 1;

    const nuevaSolicitud = {
      id: nuevoId,
      ...formulario,
      descripcion: formulario.descripcion.trim(),
      estado: "PENDIENTE",
      responsable: "Sin asignar",
    };

    setSolicitudes([...solicitudes, nuevaSolicitud]);
    setFormulario(formularioInicial);
  }

  function actualizarSolicitud(id, campo, valor) {
    const nuevasSolicitudes = solicitudes.map((solicitud) => {
      if (solicitud.id === id) {
        return {
          ...solicitud,
          [campo]: valor,
        };
      }

      return solicitud;
    });

    setSolicitudes(nuevasSolicitudes);
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
                name="estudiante"
                value={formulario.estudiante}
                onChange={manejarCambio}
                required
              >
                <option value="">Seleccionar estudiante</option>
                <option value="Estudiante Demo 1">Estudiante Demo 1</option>
                <option value="Estudiante Demo 2">Estudiante Demo 2</option>
                <option value="Estudiante Demo 3">Estudiante Demo 3</option>
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
                <option value="Equivalencia">Equivalencia</option>
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
              <label htmlFor="filtroEstado">Filtrar por estado</label>
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
              <label htmlFor="filtroPrioridad">Filtrar por prioridad</label>
              <select
                id="filtroPrioridad"
                value={filtroPrioridad}
                onChange={(e) => setFiltroPrioridad(e.target.value)}
              >
                <option value="TODAS">Todas las prioridades</option>
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
                          actualizarSolicitud(
                            solicitud.id,
                            "estado",
                            e.target.value
                          )
                        }
                      >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="EN_PROCESO">En proceso</option>
                        <option value="COMPLETADA">Completada</option>
                      </select>
                    </td>

                    <td>
                      <select
                        aria-label={`Responsable de solicitud ${solicitud.id}`}
                        value={solicitud.responsable}
                        onChange={(e) =>
                          actualizarSolicitud(
                            solicitud.id,
                            "responsable",
                            e.target.value
                          )
                        }
                      >
                        <option value="Sin asignar">Sin asignar</option>
                        <option value="Secretaría Académica">
                          Secretaría Académica
                        </option>
                        <option value="Coordinación">Coordinación</option>
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
          Versión inicial: los datos son simulados y se reinician
          al actualizar la página.
        </p>
      </main>
    </div>
  );
}

export default App;
