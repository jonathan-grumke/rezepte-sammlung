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
import "./RecipeForm.css";

export default function RezeptForm({ initialData = {}, onSubmit }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [instructions, setInstructions] = useState(initialData.instructions || "");
    const [ingredients, setIngredients] = useState(initialData.ingredients || []);
    const [servings, setServings] = useState(initialData.servings || 2);
    const [time, setTime] = useState(initialData.time || null);
    const [published, setPublished] = useState(initialData.published || false);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("instructions", instructions);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("servings", servings);
        formData.append("time", time);
        formData.append("published", published);
        if (image) {
            formData.append("image", image);
        }

        if (!validateForm()) {
            alert("Bitte alle Felder ausfüllen und mindestens eine Zutat hinzufügen.");
            return;
        }
        onSubmit(formData);
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
            <form
                className="form-container"
                onSubmit={handleSubmit}
                enctype="multipart/form-data">
                <div className="field-group">
                    <label>Titel:
                        <input
                            className="input-field"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            name="title"
                        />
                    </label>
                </div>
                <div className="field-group">
                    <label>Kategorie:
                        <select
                            className="input-field"
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
                <div className="field-group">
                    <label>Portionen:
                        <input
                            className="input-field"
                            type="number"
                            name="servings" min="1" max="20" step="1"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            style={{ width: "60px" }}
                        />
                    </label>
                </div>
                <div className="field-group">
                    <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
                </div>
                <div className="field-group">
                    <label>Zubereitungszeit (Minuten):
                        <input
                            className="input-field"
                            type="number"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={{ width: "60px" }}
                        />
                    </label>
                </div>
                <div className="field-group">
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
                <div className="field-group">
                    <label>Bild:
                        <input
                            className="input-field"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={title}
                            width="400"
                        />
                    ) : (initialData.image && (
                        <img
                            src={`/media/${initialData.image}`}
                            alt={title}
                            width="400"
                        />
                    ))}
                </div>
                <div className="field-group">
                    <label className="checkbox-label">
                        Rezept veröffentlichen:
                        <input
                            type="checkbox"
                            name="published"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />
                    </label>
                </div>
                <button className="submit-button" type="submit">Rezept speichern</button>
                <button className="cancel-button" type="button" onClick={handleCancel}>Abbrechen</button>
            </form >
        </>
    )
}