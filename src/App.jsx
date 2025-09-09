import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CancionesList from "./components/CancionesList/CancionesList.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css";

export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/canciones" element={<CancionesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
