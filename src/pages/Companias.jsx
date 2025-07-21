import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCompanias } from "../services/services";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Companias = () => {
  const [companias, setCompanias] = useState([]);
  useEffect(() => {
    obtenerCompanias();
  }, []);
  const obtenerCompanias = async () => {
    const { data } = await getCompanias();
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
              className="w-28 h-28 bg-[#F8AE1A] text-3xl text-[#333333] hover:text-white font-bold rounded-xl flex gap-1 justify-center items-center"
            >
              {comp.numero_compania}
              <FontAwesomeIcon
                className="text-3xl mt-2"
                icon="flag"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Companias;
