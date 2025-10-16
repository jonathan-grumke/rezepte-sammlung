import "../assets/styles.css";
import { useState, useEffect } from "react";
import IngredientList from "../Ingredients/IngredientList";
import Editor, {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnUnderline,
    Toolbar,
} from 'react-simple-wysiwyg';

export default function RezeptForm({ initialData = {}, onSubmit }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [instructions, setInstructions] = useState(initialData.instructions || "");
    const [ingredients, setIngredients] = useState(initialData.ingredients || []);
    const [servings, setServings] = useState(initialData.servings || 2);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Bitte alle Felder ausfüllen und mindestens eine Zutat hinzufügen.");
            return;
        }
        onSubmit({ title, category, instructions, ingredients, servings });
    };

    const validateForm = () => {
        return title.trim() !== "" && category.trim() !== "" && instructions.trim() !== "" && ingredients.length > 0 && servings > 0;
    }

    const handleCancel = () => {
        if (window.confirm("Möchtest du wirklich abbrechen? Alle Änderungen gehen verloren.")) {
            if (window.location.pathname.includes("/bearbeiten")) {
                window.location.href = `/rezept/${initialData.id}`;
            }
            else {
                window.location.href = "/rezepte";
            }
        }
        else {
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titel:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            name="title"
                        />
                    </label>
                </div>
                <div>
                    <label>Kategorie:
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            value={category}
                            name="category"
                        >
                            <option value="">Wähle eine Kategorie</option>
                            <option value="main">Hauptgericht</option>
                            <option value="dessert">Dessert</option>
                            <option value="snack">Snack</option>
                            <option value="drink">Getränk</option>
                            <option value="soup">Suppe</option>
                            <option value="salad">Salat</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Anweisungen:</label>
                    <Editor value={instructions} onChange={(e) => setInstructions(e.target.value)}>
                        <Toolbar>
                            <BtnBold />
                            <BtnItalic />
                            <BtnUnderline />
                            <BtnBulletList />
                            <BtnNumberedList />
                            <BtnLink />
                        </ Toolbar>
                    </Editor>
                </div>
                <div>
                    <label>Portionen:
                        <input
                            type="number"
                            name="servings"
                            list="servings-options" min="1" max="20" step="1"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            style={{ width: "60px" }}
                        />
                        <datalist id="servings-options">
                            <option value="1" />
                            <option value="2" />
                            <option value="4" />
                        </datalist>
                    </label>
                </div>
                <div>
                    <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
                </div>
                <button type="submit">Rezept speichern</button>
                <button type="button" onClick={handleCancel}>Abbrechen</button>
            </form >
        </>
    )
}