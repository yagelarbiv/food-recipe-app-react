import "./App.css";
import { Routes, Route } from "react-router-dom";
import  NavBar  from "./Components/NavBar/index.jsx";
import  Home  from "./Pages/Home";
import  Details  from "./Pages/Details/";
import  Favorites  from "./Pages/Favorites/";

function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
