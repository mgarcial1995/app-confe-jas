import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCompanias, getCompaniasConParticipantes } from "../services/services";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Companias = () => {
  const [companias, setCompanias] = useState([]);
  useEffect(() => {
    obtenerCompanias();
  }, []);
  const obtenerCompanias = async () => {
    const { data } = await getCompaniasConParticipantes();
    console.log(data)
    setCompanias(data);
  };
  return (
    <div>
      <Header text="Compañias" />
      <div className="flex my-2 mb-4">
        <Link
          to="/compania/crear/-"
          className="py-2 font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          Crear compañia
        </Link>
      </div>
      <div className="flex justify-center md:justify-start gap-8 flex-wrap">
        {companias.map((comp, i) => {
          return (
            <Link
              to={"/compania/edit/" + comp.id}
              key={i}
              className="w-28 h-28 bg-[#F8AE1A] text-3xl text-[#333333] hover:text-white font-bold rounded-xl flex flex-col gap-1 justify-center items-center"
            >
              <div className="flex gap-2 items-center">
                {comp.numero_compania}
                <FontAwesomeIcon
                  className="text-3xl mt-2"
                  icon="flag"
                />
              </div>
              <div className="text-md flex gap-2">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-sm text-blue-500"
                    icon="user"
                  />
                  <p className="text-lg">{comp.participantes.filter(e => e.sexo === "Masculino").length} </p>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-sm text-pink-600"
                    icon="user"
                  />
                  <p  className="text-lg">{comp.participantes.filter(e => e.sexo === "Femenino").length} </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Companias;
