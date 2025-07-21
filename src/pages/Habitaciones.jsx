import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getHabitaciones } from "../services/services";
import { useEffect, useState } from "react";

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  useEffect(() => {
    obtenerHabitaciones();
  }, []);
  const obtenerHabitaciones = async () => {
    const {data} = await getHabitaciones();
    setHabitaciones(data);
  };
  return (
    <div>
      <Header text="Habitaciones" />
      <div className="flex my-2 mb-4">
        <Link
          to="/habitacion/crear/-"
          className="py-2 font-medium px-4 rounded-md bg-[#F8AE1A] text-white"
        >
          Crear habitación
        </Link>
      </div>
      <div className="flex justify-center md:justify-start gap-8 flex-wrap">
        {habitaciones.map((hab, i) => {
          return (
            <Link
              to={"/habitacion/edit/"+hab.id}
              key={i}
              className="w-32 h-32 bg-[#F8AE1A] text-xl text-[#333333] hover:text-white font-bold rounded-xl flex flex-col justify-center items-center"
            >
              {hab.puerta_habitacion}
              <FontAwesomeIcon
                className="text-4xl mt-2"
                icon="house-chimney-user"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Habitaciones;
