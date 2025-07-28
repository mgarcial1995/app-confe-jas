import { asistioParticipante } from "../services/services";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const TablaParticipantes = ({
  data,
  obtenerListaParticipantes,
  filtroNombre,
  filtroEstaca,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const elementosPorPagina = 50;

  const datosFiltrados = useMemo(() => {
    return data.filter((p) => {
      const nombreApellido = `${p.nombres} ${p.apellidos}`.toLowerCase();
      const coincideNombre = nombreApellido.includes(
        filtroNombre.toLowerCase()
      );
      const coincideEstaca = filtroEstaca ? p.estaca === filtroEstaca : true;
      return coincideNombre && coincideEstaca;
    });
  }, [data, filtroNombre, filtroEstaca]);

  const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);

  const datosPagina = useMemo(() => {
    const start = (paginaActual - 1) * elementosPorPagina;
    const end = start + elementosPorPagina;
    return datosFiltrados.slice(start, end);
  }, [datosFiltrados, paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const asistenciaParticipante = async (id) => {
    await asistioParticipante(id)
    await obtenerListaParticipantes()
  }

  return (
    <div className="p-4 overflow-x-auto">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-1 border">Nombre</th>
            <th className="px-2 py-1 border">Estaca</th>
            <th className="px-2 py-1 border hidden md:table-cell">Compañia</th>
            <th className="px-2 py-1 border hidden md:table-cell">
              Habitación
            </th>
            <th className="px-2 py-1 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosPagina.map((p) => (
            <tr key={p.id} className={`text-sm ${p.rol === "Staff" ? "bg-sky-800 text-white font-medium" : "" }`}>
              <td className="border px-2 py-1">
                {p.nombres} {p.apellidos}
              </td>
              <td className="border px-2 py-1">{p.estaca}</td>
              <td className="border px-2 py-1 hidden md:table-cell">
                {p.num_compania}
              </td>
              <td className="border px-2 py-1 hidden md:table-cell">
                {p.habitacion && p.habitacion.puerta_habitacion || ''}
              </td>
              <td className="border px-2 py-1 ">
                <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                  <Link
                    to={"/participante/edit/" + p.id}
                    className="bg-amarillo font-medium cursor-pointer text-white px-3 py-1 rounded bg-[#F8AE1A] transition"
                  >
                    Entrar
                  </Link>
                  {p.asistencia ? (
                    <button
                      className={`bg-yellow-200 font-bold text-white px-2 py-1 rounded`}
                    >
                      Asistio
                    </button>
                  ) : (
                    <button
                      onClick={() => asistenciaParticipante(p.id)}
                      className={` cursor-pointer bg-[#F8AE1A] font-bold text-white px-2 py-1 rounded`}
                    >
                      Asistio
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaParticipantes;
