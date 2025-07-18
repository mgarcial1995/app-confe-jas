import api from './apiClient';

export const get = (path, params = {}) => api.get(path, { params });
export const post = (path, data) => api.post(path, data);
export const put = (path, data) => api.put(path, data);
export const del = (path) => api.delete(path);

// También puedes hacer funciones específicas:
export const getParticipantes = () => get('/participante/obtenerParticipantes');
export const getCompanias = () => get('/compania/obtenerCompanias');
export const getHabitaciones = () => get('/habitacion/obtenerHabitaciones');
export const getParticipante = (id) => get('/participante/obtenerParticipante/'+id);
export const getMaestrasEstaca = () => get('/maestras/estaca/obtenerEstacas');