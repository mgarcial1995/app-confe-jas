import NavBar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full">
      <NavBar />
      {/* <nav className="bg-white shadow p-4">
        <ul className="flex gap-4">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/participantes">Participantes</Link></li>
        </ul>
      </nav> */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
