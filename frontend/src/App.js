import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Rezepte from "./components/Rezepte/Rezepte";
import Rezept from "./components/Rezepte/Rezept";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/rezepte" element={<Rezepte />} />
      <Route path="/rezept/:id" element={<Rezept />} />
    </Routes>
  );
}

export default App;
