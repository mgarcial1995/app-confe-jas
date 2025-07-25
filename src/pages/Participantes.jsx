import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { exportarParticipantesAExcel, getMaestrasEstaca, getParticipantes } from "../services/services.js";
import AsyncSelect from "react-select/async";
import Header from "../components/Header.jsx";
import TablaParticipantes from "../components/TablaParticipantes.jsx";

const Participantes = () => {
  const [loader, setLoader] = useState(true);
  const [participantes, setParticipantes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstaca, setFiltroEstaca] = useState("");
  useEffect(() => {
    obtenerListaParticipantes();
  }, []);

  const obtenerEstacas = async () => {
    const estacas = await getMaestrasEstaca();
    const lista = estacas.data.map((el) => {
      return { value: el.nombre, label: el.nombre };
    });
    return lista;
  };
  const obtenerListaParticipantes = async () => {
    const participantes = await getParticipantes();
    console.log(participantes.data);
    setParticipantes(participantes.data);
    setLoader(false);
  };

  const descargarExcel = async () => {
    try {
      const response = await exportarParticipantesAExcel()

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'participantes.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
    <div>
      <Header text="Participantes" />

      <div className="flex my-2 mb-4 gap-4">
        <Link
          to="/participante/crear/-"
          className="py-2 font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          Agregar Participante
        </Link>
        <button
          onClick={descargarExcel}
          className="py-2 cursor-pointer font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          Descargar
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full md:w-1/2 gap-2 mb-4 ">
          <div className="w-full border-2 text-[#333333] border-[#333333] rounded-md flex justify-between items-center mt-2">
            <FontAwesomeIcon
              className="mx-2 text-[#333333]"
              icon="magnifying-glass"
            />
            <input
              className="w-full h-8 outline-none"
              type="text"
              placeholder="Buscar por nombre o apellido"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>
          <div>
            <label>Filtrar por estaca</label>
            <AsyncSelect
              cacheOptions
              loadOptions={obtenerEstacas}
              value={{ label: filtroEstaca, value: filtroEstaca }}
              onChange={(e) => setFiltroEstaca(e.value)}
              defaultOptions
              placeholder="Seleccionar Estaca"
              className="z-50"
            />
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={() => {
              setFiltroNombre("");
              setFiltroEstaca("");
            }}
            className={`text-red-600 text-2xl cursor-pointer p-2`}
            icon="xmark"
          />
        </div>
      </div>
      <div className="mt-4">
        {loader ? (
          <div>Cargando...</div>
        ) : (
          // <CompactTable columns={COLUMNS} data={participantes} theme={theme} />
          <TablaParticipantes
            obtenerListaParticipantes={obtenerListaParticipantes}
            data={participantes}
            obtenerEstacas={obtenerEstacas}
            filtroNombre={filtroNombre}
            filtroEstaca={filtroEstaca}
          />
        )}
      </div>
    </div>
  );
};

export default Participantes;
