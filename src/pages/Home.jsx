import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const listaRutas = [
    {
      to: "/participantes",
      text: "Participantes",
      icon: "user",
    },
    {
      to: "/habitaciones",
      text: "Habitaciones",
      icon: "house-chimney-user",
    },
    {
      to: "/companias",
      text: "Compañias",
      icon: "flag",
    },
  ];

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-around mt-4 gap-8">
        {listaRutas.map((boton, index) => {
          return (
            <div className="w-72">
              <Link to={boton.to}
                key={index}
                className="w-full h-full py-10  bg-[#F8AE1A] px-4 text-xl text-[#333333] hover:text-white font-bold rounded-lg flex flex-col items-center"
              >
                {boton.text}
                <FontAwesomeIcon className="text-7xl mt-4" icon={boton.icon} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
