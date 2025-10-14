import "../assets/styles.css";
import { useState, useEffect } from "react";
import IngredientList from "../Ingredients/IngredientList";

export default function RezeptForm({ initialData = {}, onSubmit }) {
    const [name, setName] = useState(initialData.name || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [ingredients, setIngredients] = useState(initialData.ingredients || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Bitte alle Felder ausfüllen und mindestens eine Zutat hinzufügen.");
            return;
        }
        onSubmit({ name, category, description, ingredients });
    };

    const validateForm = () => {
        return name.trim() !== "" && category.trim() !== "" && description.trim() !== "" && ingredients.length > 0;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Kategorie:</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        value={category}
                    >
                        <option value="">Wähle eine Kategorie</option>
                        <option value="main">Hauptgericht</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                        <option value="drink">Getränk</option>
                        <option value="soup">Suppe</option>
                        <option value="salad">Salat</option>
                    </select>
                </div>
                <div>
                    <label>Beschreibung:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
                </div>
                <button type="submit">Rezept erstellen</button>
            </form>
        </>
    )
}