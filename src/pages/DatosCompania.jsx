import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  asignarParticipanteACompania,
  crearCompania,
  editarCompania,
  eliminarCompania,
  getCompania,
  getParticipantesCompania,
  getParticipantesPorEdadPorCompania,
} from "../services/services";
import { useEffect, useState } from "react";

const DatosCompania = () => {
  const datocompania = {
    numero_compania: 0,
    min_cant_participantes: 0,
    max_cant_participantes: 0,
    edad_minima: 0,
    edad_maxima: 0,
  };
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [compania, setCompania] = useState(datocompania);
  const [participantes, setParticipantes] = useState([]);
  const [partVarones, setPartVarones] = useState(0);
  const [partMujeres, setParMujeres] = useState(0);
  const [sugerenciaParticipantes, setSugerenciaParticipantes] = useState([]);

  useEffect(() => {
    if (type === "edit") {
      obtenerDatosCompania();
      obtenerParticipantesCompania();
      obtenerParticipantesSugerenciaEdadCompania();
    }
  }, []);

  const obtenerDatosCompania = async () => {
    try {
      const { data } = await getCompania(id);
      setCompania(data);
    } catch (error) {
      console.error("Error al obtener datos de la habitación", error);
    }
  };
  const obtenerParticipantesCompania = async () => {
    try {
      const { data } = await getParticipantesCompania(id);
      setPartVarones(data.filter(e => e.sexo === "Masculino").length)
      setParMujeres(data.filter(e => e.sexo === "Femenino").length)
      setParticipantes(data);
    } catch (error) {
      console.error("Error al obtener datos de la habitación", error);
    }
  };
  const obtenerParticipantesSugerenciaEdadCompania = async () => {
    try {
      const { data } = await getParticipantesPorEdadPorCompania(id);
      setSugerenciaParticipantes(data);
    } catch (error) {
      console.error("Error al obtener datos de la habitación", error);
    }
  };
  const handleChangeCampos = (e) => {
    const { name, type, value, checked } = e.target;

    setCompania((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  if (type === "edit" && !compania && !participantes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">
          Cargando información de la habitación...
        </p>
      </div>
    );
  }

  const eliminarHab = async () => {
    await eliminarCompania(id);
    navigate("/companias");
  };

  const asignarCompania = async (idPart) => {
    const obj = {
      idparticipante: idPart,
      idCompania: Number(id),
    };
    console.log(obj)
    await asignarParticipanteACompania(obj);
    await obtenerParticipantesCompania();
    await obtenerParticipantesSugerenciaEdadCompania();
  };

  const guardarDatosCompania = async () => {
    const transform = Object.assign(compania, {});
    transform.min_cant_participantes = Number(transform.min_cant_participantes);
    transform.max_cant_participantes = Number(transform.max_cant_participantes);
    transform.edad_minima = Number(transform.edad_minima);
    transform.edad_maxima = Number(transform.edad_maxima);
    transform.numero_compania = Number(transform.numero_compania);
    console.log(transform);
    if (type === "crear") {
      await crearCompania(transform);
      navigate("/companias");
    } else {
      console.log(transform);
      await editarCompania(transform);
      navigate("/companias");
    }
  };
  return (
    <div>
      <Header
        text={
          type === "crear"
            ? "Crear Compañia"
            : `Compañia ${compania.numero_compania}`
        }
      />
      <div>
        <div className="w-full md:w-3/4 h-auto gap-x-8 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            {type === "crear" && (
              <div className="flex flex-col w-56">
                <label>Numero de Compañia</label>
                <input
                  className="outline-none border border-[#333333] rounded-md p-1"
                  value={compania.numero_compania}
                  name="numero_compania"
                  type="text"
                  onChange={handleChangeCampos}
                />
              </div>
            )}
            {type === "edit" && <div className="flex flex-col w-56">
              <p>Varones: {partVarones}</p>
              <p>Mujeres: {partMujeres}</p>
            </div>}
            <div className="flex flex-col w-56">
              <label>Edad mínima de participantes</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={compania.edad_minima}
                name="edad_minima"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Edad máxima de participantes</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={compania.edad_maxima}
                name="edad_maxima"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Cantidad minima de personas</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={compania.min_cant_participantes}
                name="min_cant_participantes"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Cantidad maxima de personas</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={compania.max_cant_participantes}
                name="max_cant_participantes"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
          </div>
          {participantes.length > 0 && (
            <div className="w-full md:w-1/2">
              <p className="font-bold">Participantes:</p>
              <table className="table-auto w-full border">
                <thead className="w-full">
                  <tr className="bg-gray-200">
                    <th className="px-2 py-1 border"></th>
                    <th className="px-2 py-1 border">Nombre</th>
                    <th className="px-2 py-1 border">Estaca</th>
                    <th className="px-2 py-1 border"></th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {participantes.map((p) => (
                    <tr key={p.id} className="text-sm">
                      <td className="border px-2 py-1">
                        <FontAwesomeIcon
                          className={
                            p.sexo === "Masculino"
                              ? "text-blue-500"
                              : "text-pink-500"
                          }
                          icon="user"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        {p.nombres} {p.apellidos}
                      </td>
                      <td className="border px-2 py-1">{p.estaca}</td>

                      <td className="border px-2 py-1 ">
                        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                          <Link
                            to={"/participante/edit/" + p.id}
                            className="bg-amarillo font-medium cursor-pointer text-white px-3 py-1 rounded bg-[#F8AE1A] transition"
                          >
                            Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="w-full md:w-1/2">
            <p className="font-bold">
              Participantes Sugeridos para esta compañia:
            </p>
            <table className="table-auto w-full border">
              <thead className="w-full">
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 border"></th>
                  <th className="px-2 py-1 border">Nombre</th>
                  <th className="px-2 py-1 border">Estaca</th>
                  <th className="px-2 py-1 border">Edad</th>
                  <th className="px-2 py-1 border"></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {sugerenciaParticipantes.map((p) => (
                  <tr key={p.id} className="text-sm">
                    <td className="border px-2 py-1">
                      <FontAwesomeIcon
                        className={
                          p.sexo === "Masculino"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }
                        icon="user"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      {p.nombres} {p.apellidos}
                    </td>
                    <td className="border px-2 py-1">{p.estaca}</td>
                    <td className="border px-2 py-1">{p.edad}</td>

                    <td className="border px-2 py-1 ">
                      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                        <button
                          onClick={() =>asignarCompania(p.id)}
                          className="bg-amarillo font-medium cursor-pointer text-white px-3 py-1 rounded bg-[#F8AE1A]"
                        >Agregar</button>
                        {/* <Link
                          to={"/participante/edit/" + p.id}
                          className="bg-amarillo font-medium cursor-pointer text-white px-3 py-1 rounded bg-[#F8AE1A]"
                        >
                          Ver
                        </Link> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full gap-4 flex mt-4 my-2 mb-4">
          {!participantes.length > 0 && type === "edit" ? (
            <button
              onClick={eliminarHab}
              className="py-2 font-medium cursor-pointer px-4 rounded-md bg-red-300 hover:bg-red-500 text-white"
            >
              Eliminar Compañia
            </button>
          ) : (
            ""
          )}
          <button
            onClick={guardarDatosCompania}
            className="py-2 font-medium cursor-pointer px-4 rounded-md bg-[#F8AE1A] text-white"
          >
            {type === "crear" ? "Crear" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatosCompania;
