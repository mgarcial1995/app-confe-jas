import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import {
  crearParticipante,
  editarParticipante,
  getMaestrasEstaca,
  getParticipante,
} from "../services/services.js";
import ModalCompanias from "../components/ModalCompanias.jsx";
import ModalHabitaciones from "../components/ModalHabitaciones.jsx";
import Header from "../components/Header.jsx";

const DatosParticipante = () => {
  const sexoOpt = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
  ];
  const tipoDoc = [
    { label: "DNI", value: "DNI" },
    { label: "C.E.", value: "C.E." },
  ];
  const tallasOpt = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [openModalCompania, setOpenModalCompania] = useState(false);
  const [openModalHabitaciones, setOpenModalHabitaciones] = useState(false);
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
    tipo_documento: "",
    nro_documento: "",
    estado: 1,
    asistencia: false,
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
    setParticipante((prev) => ({
      ...prev,
      [name]: selectedOption.value,
    }));
  };

  const guardarUsuario = async () => {
    const transform = Object.assign(participante, {});
    transform.edad = Number(transform.edad);
    transform.id_habitacion = Number(transform.id_habitacion);
    if(type=== 'crear'){
      await crearParticipante(transform);
      navigate("/participantes");
    } else {
      console.log(transform)
        transform.id_habitacion = transform.id_habitacion === 0 ? null : Number(transform.id_habitacion);
        await editarParticipante(transform);
        navigate("/participantes");
    }
  };
  return (
    <div>
      <ModalCompanias
        datosParticipante={participante}
        isOpen={openModalCompania}
        obtenerParticipante={obtenerParticipante}
        onClose={() => setOpenModalCompania(false)}
      />
      <ModalHabitaciones
        isOpen={openModalHabitaciones}
        onClose={() => setOpenModalHabitaciones(false)}
        datosParticipante={participante}
        obtenerParticipante={obtenerParticipante}
      />
      <Header text={`${type === "crear" ? "Crear" : "Editar"} Participante`} />
      { participante.rol === "Staff" &&<div>
        <p className="text-lg font-bold text-green-500"> {participante.rol || ""} </p>
      </div>}
      {type === "edit" && (
        <div className="flex gap-8 mb-4">
          {participante.num_compania ? (
            <div className="">
              <div>
                <p className="font-bold"> Compañia asignada:</p>
                <div className="flex items-center gap-2 text-xl">
                  <FontAwesomeIcon className="text-[#F8AE1A]" icon="flag" />
                  <p className=" font-medium">{participante.num_compania}</p>
                </div>
              </div>
              <button
                onClick={() => setOpenModalCompania(true)}
                className="mt-2 text-sm bg-[#F8AE1A] font-medium px-2 py-1 cursor-pointer rounded-md text-[#333333] hover:text-white"
              >
                Cambiar compañia
              </button>
            </div>
          ) : (
            <div className="">
              <p className="font-bold">Asignar Compañia:</p>
              <FontAwesomeIcon
                onClick={() => setOpenModalCompania(true)}
                className="text-2xl mt-2 bg-[#F8AE1A] px-4 py-3 cursor-pointer rounded-md text-[#333333] hover:text-white"
                icon="flag"
              />
            </div>
          )}
          {participante.id_habitacion ? (
            <div>
              <p className="font-bold">Habitación asignada:</p>
              <div>
                <div className="flex items-center gap-2 text-xl">
                  <FontAwesomeIcon
                    className="text-[#F8AE1A]"
                    icon="house-chimney-user"
                  />
                  <p className=" font-medium">{participante.habitacion.puerta_habitacion}</p>
                </div>
                <button
                  onClick={() => setOpenModalHabitaciones(true)}
                  className="mt-2 text-sm bg-[#F8AE1A] font-medium px-2 py-1 cursor-pointer rounded-md text-[#333333] hover:text-white"
                >
                  Cambiar Habitación
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold">Asignar Habitación:</p>
              <FontAwesomeIcon
                onClick={() => setOpenModalHabitaciones(true)}
                className="text-2xl mt-2 bg-[#F8AE1A] px-3 py-3 cursor-pointer rounded-md text-[#333333] hover:text-white"
                icon="house-chimney-user"
              />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-start gap-4">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col w-56">
            <label>Tipo de Documento</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="tipo_documento"
              onChange={handleChangeSelect}
              value={{
                label: participante.tipo_documento || '',
                value: participante.tipo_documento || '',
              }}
              options={tipoDoc}
            />
          </div>
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
            <label>Numero de Documento</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              value={participante.nro_documento}
              name="nro_documento"
              type="text"
              onChange={handleChangeCampos}
            />
          </div>
          <div className="flex flex-col w-56">
            <label>Talla Camiseta</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
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
          <div className="flex flex-col items-start justify-start w-56 gap-2">
            <label>Asistio</label>
            <input
              className="outline-none border border-[#333333] rounded-md p-1"
              checked={!!participante.asistencia}
              //   disabled={type === "edit"}
              name="asistencia"
              type="checkbox"
              onChange={handleChangeCampos}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex mt-4 my-2 mb-4">
        <button
          onClick={guardarUsuario}
          className="py-2 cursor-pointer font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          {type === "crear" ? "Crear" : "Editar"}
        </button>
      </div>
    </div>
  );
};

export default DatosParticipante;
