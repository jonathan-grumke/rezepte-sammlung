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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Bitte alle Felder ausfüllen und mindestens eine Zutat hinzufügen.");
            return;
        }
        onSubmit({ title, category, instructions, ingredients });
    };

    const validateForm = () => {
        return title.trim() !== "" && category.trim() !== "" && instructions.trim() !== "" && ingredients.length > 0;
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
                    <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
                </div>
                <button type="submit">Rezept speichern</button>
                <button type="button" onClick={() => window.location.href = "/rezepte"}>Abbrechen</button>
            </form>
        </>
    )
}