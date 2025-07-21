import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  asignarParticipanteAHabitacion,
  getHabitacionesConParticipantes,
} from "../services/services";
import Modal from "./Modal";
import { useEffect, useState } from "react";

const ModalHabitaciones = ({
  isOpen,
  onClose,
  datosParticipante,
  obtenerParticipante,
}) => {
  const [habitaciones, setHabitaciones] = useState([]);
  useEffect(() => {
    obtenerCompaniasParticipantes();
  }, [isOpen]);
  const obtenerCompaniasParticipantes = async () => {
    const { data } = await getHabitacionesConParticipantes();
    const listaComps = data.map((el) => {
      return {
        ...el,
        open: false,
      };
    });
    setHabitaciones(listaComps);
  };
  const abrirHabitacion = (i) => {
    const lista = [...habitaciones];
    lista[i].open = !lista[i].open;
    setHabitaciones(lista);
  };
  const asignarHabitacion = async (habitacion) => {
    const datos = {
        idparticipante: datosParticipante.id,
        habitacion: {
            id: habitacion.id,
            numero: habitacion.puerta_habitacion,
        },
    };
    await asignarParticipanteAHabitacion(datos);
    obtenerParticipante();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Habitaciones">
      <div className="w-full overflow-auto flex flex-col gap-y-4">
        {habitaciones.map((habitacion, i) => {
          return (
            <div key={i} className="w-full">
              <div
                onClick={() => abrirHabitacion(i)}
                className="w-full flex items-center justify-between text-md font-medium p-2 px-4 rounded-2xl bg-amber-400 text-[#333333]"
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon="house-chimney-user" />
                  <p>Habitacion {habitacion.puerta_habitacion}</p>
                </div>
                <div className="text-2xl text-white">
                  {habitacion.open ? (
                    <FontAwesomeIcon
                      //   onClick={() => abrirCompania(i)}
                      className="cursor-pointer"
                      icon="square-caret-up"
                    />
                  ) : (
                    <FontAwesomeIcon
                      //   onClick={() => abrirCompania(i)}
                      className="cursor-pointer"
                      icon="square-caret-down"
                    />
                  )}
                </div>
              </div>
              <div className="border-l border-amber-300 ">
                {habitacion.open && (
                  <div>
                    <div className="px-8 pt-2  flex flex-wrap gap-x-6">
                      {habitacion.participantes.map((usuario, index) => {
                        return (
                          <p key={index} className="flex items-center gap-2">
                            <FontAwesomeIcon
                              className="text-[#333333]"
                              icon="user"
                            />
                            {usuario.nombres} {usuario.apellidos}
                          </p>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => asignarHabitacion(habitacion)}
                      className="py-2 ml-8 mt-2 cursor-pointer font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
                    >
                      Asignar
                    </button>
                  </div>
                )}
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalHabitaciones;
