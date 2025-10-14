import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Rezepte from "./components/Rezepte/Rezepte";
import Rezept from "./components/Rezepte/Rezept";
import CreateRezept from "./components/Rezepte/CreateRezept";
import EditRecipe from "./components/Rezepte/EditRecipe";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/rezepte" element={<Rezepte />} />
      <Route path="/rezept/:id" element={<Rezept />} />
      <Route path="/neues-rezept" element={<CreateRezept />} />
      <Route path="/rezept/:id/bearbeiten" element={<EditRecipe />} />
    </Routes>
  );
}

export default App;
