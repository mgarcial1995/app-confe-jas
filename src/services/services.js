import api from "./apiClient";

export const get = (path, params = {}) => api.get(path, { params });
export const post = (path, data) => api.post(path, data);
export const put = (path, data) => api.put(path, data);
export const del = (path) => api.delete(path);

// También puedes hacer funciones específicas:
export const crearParticipante = (data) =>
  post("/participante/crearParticipante", data);
export const getParticipantes = () => get("/participante/obtenerParticipantes");

export const asignarParticipanteACompania = (data) =>
  post("/participante/asignarParticipanteACompania", data);

export const editarParticipante = (data) =>
  post("/participante/editarParticipante", data);

export const asignarParticipanteAHabitacion = (data) =>
  post("/participante/asignarParticipanteAHabitacion", data);
export const getParticipante = (id) =>
  get("/participante/obtenerParticipante/" + id);
export const asistioParticipante = (id) =>
  put("/participante/asistioParticipante/", {
    idParticipante: id,
  });

export const getCompanias = () => get("/compania/obtenerCompanias");
export const getCompania = (id) => get("/compania/obtenerCompania/"+id);
export const getParticipantesPorEdadPorCompania = (id) => get("/compania/obtenerParticipantesPorEdadPorCompania/"+id);
export const crearCompania = (data) => post("/compania/crearCompania/",data);
export const editarCompania = (data) => put("/compania/editarCompania/",data);
export const getParticipantesCompania = (id) => get("/compania/obtenerParticipantesPorNumeroCompania/"+id);
export const eliminarCompania = (id) => del("/compania/eliminarCompania/"+id);
export const getCompaniasConParticipantes = () =>
  get("/compania/obtenerCompaniasConParticipantes");

export const crearHabitacion = (data) => post("/habitacion/crearHabitacion", data);
export const editarHabitacion = (data) => put("/habitacion/editarHabitacion", data);

export const getHabitaciones = () => get("/habitacion/obtenerHabitaciones");
export const getHabitacion = (id) => get("/habitacion/obtenerHabitacion/"+id);
export const eliminarHabitacion = (id) => del("/habitacion/eliminarHabitacion/"+id);
export const getParticipantesHabitacion = (id) => get("/habitacion/obtenerParticipantesPorHabitacion/"+id);
export const getHabitacionesConParticipantes = () =>
  get("/habitacion/obtenerHabitacionesConParticipantes");

export const getMaestrasEstaca = () => get("/maestras/estaca/obtenerEstacas");
