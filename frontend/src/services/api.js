const API_URL = "http://localhost:3000";


async function realizarPeticion(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, opciones);

  if (!respuesta.ok) {
    throw new Error("Error al comunicarse con la API");
  }

  return respuesta.json();
}


export function obtenerSolicitudes() {
  return realizarPeticion("/solicitudes");
}


export function obtenerEstudiantes() {
  return realizarPeticion("/estudiantes");
}


export function obtenerResponsables() {
  return realizarPeticion("/responsables");
}


export function crearSolicitud(datosSolicitud) {
  return realizarPeticion("/solicitudes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosSolicitud),
  });
}


export function cambiarEstadoSolicitud(id, estado) {
  return realizarPeticion(`/solicitudes/${id}/estado`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estado,
    }),
  });
}


export function asignarResponsableSolicitud(id, responsableId) {
  return realizarPeticion(`/solicitudes/${id}/responsable`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      responsableId,
    }),
  });
}