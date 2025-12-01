import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Recipes from "./components/Rezepte/Recipes";
import Recipe from "./components/Rezepte/Recipe";
import CreateRecipe from "./components/Rezepte/CreateRecipe";
import EditRecipe from "./components/Rezepte/EditRecipe";
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
