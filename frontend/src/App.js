import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Recipes from "./components/Recipes/Recipes";
import Recipe from "./components/Recipes/Recipe";
import CreateRecipe from "./components/Recipes/CreateRecipe";
import EditRecipe from "./components/Recipes/EditRecipe";
import NonPublicRecipes from "./components/Recipes/NonPublicRecipes";
import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrieren" element={<Register />} />
        <Route path="/rezept/:id" element={<Recipe />} />
        <Route path="/rezept/:id/bearbeiten" element={<EditRecipe />} />
        <Route path="/neues-rezept" element={<CreateRecipe />} />
        <Route path="/nicht-veroeffentlichte-rezepte" element={<NonPublicRecipes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
