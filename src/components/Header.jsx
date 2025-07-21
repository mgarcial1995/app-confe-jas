import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center mb-4 gap-4">
      <FontAwesomeIcon
        onClick={() => navigate(-1)}
        className="text-xl cursor-pointer text-white rounded-full p-2 bg-[#F8AE1A]"
        icon={"arrow-left"}
      />
      <h1 className="text-2xl font-bold ">
        {props.text}
      </h1>
    </div>
  );
};

export default Header;
