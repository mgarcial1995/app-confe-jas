import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  crearHabitacion,
  editarHabitacion,
  eliminarHabitacion,
  getHabitacion,
  getParticipantesHabitacion,
} from "../services/services";
import { useEffect, useState } from "react";

const DatosHabitacion = () => {
  const dataHabitacion = {
    puerta_habitacion: "",
    numero_habitacion: "",
    letra_habitacion: "",
    cant_min_habitacion: "",
    cant_max_habitacion: "",
  };
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [habitacion, setHabitacion] = useState(dataHabitacion);
  const [participantes, setParticipantes] = useState([]);
  useEffect(() => {
    if (type === "edit") {
      obtenerDatosHabitaciones();
      obtenerParticipantesHabitacion();
    }
  }, []);
  const obtenerDatosHabitaciones = async () => {
    try {
      const { data } = await getHabitacion(id);
      setHabitacion(data);
    } catch (error) {
      console.error("Error al obtener datos de la habitación", error);
    }
  };
  const obtenerParticipantesHabitacion = async () => {
    try {
      const { data } = await getParticipantesHabitacion(id);
      setParticipantes(data);
    } catch (error) {
      console.error("Error al obtener datos de la habitación", error);
    }
  };
  const handleChangeCampos = (e) => {
    const { name, type, value, checked } = e.target;

    setHabitacion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  if (type === "edit" && !habitacion && !participantes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">
          Cargando información de la habitación...
        </p>
      </div>
    );
  }

  const eliminarHab = async () => {
    await eliminarHabitacion(id);
    navigate("/habitaciones");
  };

  const guardarDatosHabitacion = async () => {
    const transform = Object.assign(habitacion, {});
    transform.cant_max_habitacion = Number(transform.cant_max_habitacion);
    transform.cant_min_habitacion = Number(transform.cant_min_habitacion);
    transform.numero_habitacion = Number(transform.numero_habitacion);
    transform.puerta_habitacion = `${transform.letra_habitacion} ${transform.numero_habitacion}`;
    console.log(transform);
    if (type === "crear") {
      await crearHabitacion(transform);
      navigate("/habitaciones");
    } else {
      console.log(transform);
      await editarHabitacion(transform);
      navigate("/habitaciones");
    }
  };
  return (
    <div>
      <Header
        text={
          type === "crear"
            ? "Crear Habitación"
            : `Habitacion ${habitacion.puerta_habitacion}`
        }
      />
      <div>
        <div className="w-3/4 h-auto gap-x-8 flex flex-col md:flex-row">
          <div className="flex flex-col gap-2">
            <div>
              <label>Puerta Habitación</label>
              <p>
                {habitacion.letra_habitacion} {habitacion.numero_habitacion}
              </p>
            </div>
            <div className="flex flex-col w-56">
              <label>Letra de Habitación</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={habitacion.letra_habitacion}
                name="letra_habitacion"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Número de habitación</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={habitacion.numero_habitacion}
                name="numero_habitacion"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Cantidad minima de personas</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={habitacion.cant_min_habitacion}
                name="cant_min_habitacion"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
            <div className="flex flex-col w-56">
              <label>Cantidad maxima de personas</label>
              <input
                className="outline-none border border-[#333333] rounded-md p-1"
                value={habitacion.cant_max_habitacion}
                name="cant_max_habitacion"
                type="text"
                onChange={handleChangeCampos}
              />
            </div>
          </div>
          <div>
            <p className="font-bold">Participantes:</p>
            {participantes.map((part, i) => {
              return (
                <div key={i}>
                  <p>
                    {part.nombres} {part.apellidos}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full gap-4 flex mt-4 my-2 mb-4">
          {!participantes.length > 0 && (
            <button
              onClick={eliminarHab}
              className="py-2 font-medium cursor-pointer px-4 rounded-md bg-red-300 hover:bg-red-500 text-white"
            >
              Eliminar Habitación
            </button>
          )}
          <button
            onClick={guardarDatosHabitacion}
            className="py-2 font-medium cursor-pointer px-4 rounded-md bg-[#F8AE1A] text-white"
          >
            {type === "crear" ? "Crear" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatosHabitacion;
