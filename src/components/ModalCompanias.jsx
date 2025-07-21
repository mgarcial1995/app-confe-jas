import { useEffect, useState } from "react";
import {
  asignarParticipanteACompania,
  getCompaniasConParticipantes,
} from "../services/services";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalCompanias = ({
  isOpen,
  onClose,
  datosParticipante,
  obtenerParticipante,
}) => {
  const [companias, setCompanias] = useState([]);
  useEffect(() => {
    obtenerCompaniasParticipantes();
  }, []);
  const obtenerCompaniasParticipantes = async () => {
    const { data } = await getCompaniasConParticipantes();
    const listaComps = data.map((el) => {
      return {
        ...el,
        open: false,
      };
    });
    setCompanias(listaComps);
  };
  const abrirCompania = (i) => {
    const lista = [...companias];
    lista[i].open = !lista[i].open;
    setCompanias(lista);
  };
  const asignarCompania = async (idCompania) => {
    const datos = {
      idparticipante: datosParticipante.id,
      idCompania: idCompania,
    };
    await asignarParticipanteACompania(datos);
    obtenerParticipante();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compañias">
      <div className="w-full overflow-auto flex flex-col gap-y-4">
        {companias.map((compania, i) => {
          return (
            <div key={i} className="w-full">
              <div onClick={() => abrirCompania(i)} className="w-full flex items-center justify-between text-md font-medium p-2 px-4 rounded-2xl bg-amber-400 text-[#333333]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon="flag" />
                  <p>
                    Compañia {compania.numero_compania} ({compania.edad_minima}{" "}
                    - {compania.edad_maxima} años)
                  </p>
                </div>
                <div className="text-2xl text-white">
                  {compania.open ? (
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
                {compania.open && (
                  <div>
                    <div className="px-8 pt-2  flex flex-wrap gap-x-6">
                      {compania.participantes.map((usuario, index) => {
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
                      onClick={() => asignarCompania(compania.id)}
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

export default ModalCompanias;
