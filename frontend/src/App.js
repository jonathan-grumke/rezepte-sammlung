import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Recipes from "./components/Rezepte/Recipes";
import Recipe from "./components/Rezepte/Recipe";
import CreateRecipe from "./components/Rezepte/CreateRecipe";
import EditRecipe from "./components/Rezepte/EditRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recipes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rezept/:id" element={<Recipe />} />
      <Route path="/neues-rezept" element={<CreateRecipe />} />
      <Route path="/rezept/:id/bearbeiten" element={<EditRecipe />} />
    </Routes>
  );
}

export default App;
