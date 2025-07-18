import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Estacas } from "../utils/constants.js";
import AsyncSelect from "react-select/async";

import { getMaestrasEstaca, getParticipante } from "../services/services.js";

const DatosParticipante = () => {
  const sexoOpt = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
  ];
  const tallasOpt = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];
  const navigate = useNavigate();
  const { type, id } = useParams();
  useEffect(() => {
    if (type === "edit") {
      obtenerParticipante();
    }
  }, []);

  const obtenerParticipante = async () => {
    const participante = await getParticipante(id);

    setParticipante(participante.data);
  };

  const [participante, setParticipante] = useState({
    apellidos: "",
    nombres: "",
    nombre_preferencia: "",
    edad: "",
    sexo: "",
    es_miembro: false,
    talla_camiseta: "",
    barrio: "",
    estaca: "",
    celular: "",
    estado: 1,
    num_compania: "",
    habitacion: "",
    asistencia: false,
    id_compania: "",
    id_habitacion: "",
  });

  const obtenerEstacas = async () => {
    const estacas = await getMaestrasEstaca();
    const lista = estacas.data.map((el) => {
      return { value: el.nombre, label: el.nombre };
    });
    return lista;
  };

  const handleChangeCampos = (e) => {
    const { name, type, value, checked } = e.target;

    setParticipante((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeSelect = (selectedOption, { name }) => {
    console.log(selectedOption);
    console.log(name);
    setParticipante((prev) => ({
      ...prev,
      [name]: selectedOption.value, // o selectedOption.value si solo necesitas el valor
    }));
  };
  const guardarUsuario = () => {
    console.log(participante);
  };
  return (
    <div>
      <div className="flex items-center mb-4 gap-4">
        <FontAwesomeIcon
          onClick={() => navigate(-1)}
          className="text-2xl  text-white rounded-full p-1 bg-[#F8AE1A]"
          icon={"arrow-left"}
        />
        <h1 className="text-2xl font-bold ">
          {type === "crear" ? "Crear" : "Editar"} Participante
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-start gap-4">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col w-56">
            <label>Nombres</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.nombres}
              name="nombres"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Apellidos</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.apellidos}
              name="apellidos"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Nombre de Preferencia</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.nombre_preferencia}
              name="nombre_preferencia"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Edad</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.edad}
              name="edad"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>

          <div className="flex flex-col w-56">
            <label>Sexo</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="sexo"
              value={{ label: participante.sexo, value: participante.sexo }}
              options={sexoOpt}
              onChange={handleChangeSelect}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col w-56">
            <label>Talla Camiseta</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="talla_camiseta"
              onChange={handleChangeSelect}
              value={{
                label: participante.talla_camiseta,
                value: participante.talla_camiseta,
              }}
              options={tallasOpt}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Estaca</label>
            <AsyncSelect
              cacheOptions
              name="estaca"
              value={{ label: participante.estaca, value: participante.estaca }}
              loadOptions={obtenerEstacas}
              onChange={handleChangeSelect}
              defaultOptions
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Barrio</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.barrio}
              name="barrio"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Celular</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.celular}
              name="celular"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col items-start justify-start w-56 gap-2">
            <label>Es miembro</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              checked={!!participante.es_miembro}
              disabled={type === "edit"}
              name="es_miembro"
              type="checkbox"
              onChange={handleChangeCampos}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex mt-4 my-2 mb-4">
        <button
          onClick={guardarUsuario}
          className="py-2 font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          {type === "crear" ? "Crear" : "Editar"}
        </button>
      </div>
    </div>
  );
};

export default DatosParticipante;
