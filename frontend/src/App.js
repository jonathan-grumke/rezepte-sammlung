import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Rezepte from "./components/Rezepte/Rezepte"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/rezepte" element={<Rezepte />} />
    </Routes>
  );
}

export default App;
