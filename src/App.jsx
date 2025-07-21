import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Participantes from "./pages/Participantes";
import Habitaciones from "./pages/Habitaciones";
import Companias from "./pages/Companias";
import DatosParticipante from "./pages/DatosParticipante";
import Layout from "./layouts/Layout";
import DatosHabitacion from "./pages/DatosHabitacion";
import DatosCompania from "./pages/DatosCompania";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/participantes" element={<Participantes />} />
        <Route path="/participante/:type/:id" element={<DatosParticipante />} />
        <Route path="/habitacion/:type/:id" element={<DatosHabitacion />} />
        <Route path="/compania/:type/:id" element={<DatosCompania />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/companias" element={<Companias />} />
      </Route>
    </Routes>
  );
}

export default App;
