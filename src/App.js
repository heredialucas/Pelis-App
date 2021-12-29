import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router";
import Movie from "./components/Movies/Movies";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Buscador />} />
        <Route path="/favs" element={<Favorites />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </>
  );
}

export default App;
