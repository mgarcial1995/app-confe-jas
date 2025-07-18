import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const NavBar =() => {
    return (
    <div className='w-full bg-[#F8AE1A] py-4 text-center flex flex-col items-center'>
        <Link to="/">
            <img className='w-auto h-20 rounded-xl ' src={logo} alt='logo' />
        </Link>
        
    </div>
  );
}

export default NavBar;
