import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import IngredientList from "../Ingredients/IngredientList";

export default function CreateRezept() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const postRecipe = async () => {
        if (!validateForm()) {
            alert("Bitte alle Felder ausfüllen und mindestens eine Zutat hinzufügen.");
            return;
        }

        let data = {
            "name": name,
            "category": category,
            "description": description,
            "ingredients": ingredients
        };
        try {
            const res = await fetch("/myapp/recipe/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to create recipe");
            }

            const newRecipe = await res.json();
            console.log("Recipe created successfully:", newRecipe);
            alert("Rezept erfolgreich erstellt!");
            // Optionally, reset form fields
            setName("");
            setCategory("");
            setDescription("");
            setIngredients([]);
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const validateForm = () => {
        return name.trim() !== "" && category.trim() !== "" && description.trim() !== "" && ingredients.length > 0;
    }

    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            {/* Check if user is logged in */}
            <title>Neues Rezept</title>
            <h1>Rezept erstellen</h1>
            {!isLoggedIn && <p>Bitte einloggen, um ein Rezept zu erstellen.</p>}
            {isLoggedIn &&
                <>
                    <form onSubmit={(e) => { e.preventDefault(); postRecipe(); }}>
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
            }
        </>
    );
}