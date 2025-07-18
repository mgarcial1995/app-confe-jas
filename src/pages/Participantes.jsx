import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Estacas } from "../utils/constants.js";
import { CompactTable } from "@table-library/react-table-library/compact";
import { Link } from "react-router-dom";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { getMaestrasEstaca, getParticipantes } from "../services/services.js";
import AsyncSelect from "react-select/async";
import Header from "../components/Header.jsx";

const Participantes = () => {
  const [loader, setLoader] = useState(true);
  const [estaca, setEstacas] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  useEffect(() => {
    obtenerEstacas();
    obtenerListaParticipantes();
  }, []);
  const COLUMNS = [
    {
      label: "Nombres",
      renderCell: (item) => item.nombres,
    },
    {
      label: "Apellidos",
      renderCell: (item) => item.apellidos,
    },
    {
      label: "Estaca",
      renderCell: (item) => item.estaca,
    },
    {
      label: "Acción",
      renderCell: (item) => (
        <div className="flex">
          <Link
            to={'/participante/edit/'+item.id}
            // onClick={() => console.log(item)}
            className="bg-amarillo font-medium cursor-pointer text-white px-3 py-1 rounded bg-[#F8AE1A] transition"
          >
            Seleccionar
          </Link>
        </div>
      ),
    },
  ];
  const theme = useTheme(getTheme());

  const obtenerEstacas = async () => {
    const estacas = await getMaestrasEstaca();
    const lista = estacas.data.map((el) => {
      return { value: el.nombre, label: el.nombre };
    });
    return lista;
  };
  const obtenerListaParticipantes = async () => {
    const participantes = await getParticipantes();
    setParticipantes({ nodes: participantes.data });
    setLoader(false);
  };

  return (
    <div>
      <Header text='Participantes' />
    
      <div className="flex my-2 mb-4">
        <Link
          to="/participante/crear/-"
          className="py-2 font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          Agregar Participante
        </Link>
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="w-full">
          <AsyncSelect
            cacheOptions
            loadOptions={obtenerEstacas}
            defaultOptions
          />
        </div>
        <div className="w-full border-2 text-[#333333] border-[#333333] rounded-md flex justify-between items-center mt-2">
          <FontAwesomeIcon
            className="mx-2 text-[#333333]"
            icon="magnifying-glass"
          />
          <input
            className="w-full h-8 outline-none"
            type="text"
            placeholder="Buscar por nombre"
          />
        </div>
      </div>
      <div className="mt-4">
        {loader ? (
          <div>Cargando...</div>
        ) : (
          <CompactTable columns={COLUMNS} data={participantes} theme={theme} />
        )}
      </div>
    </div>
  );
};

export default Participantes;
