import "./Recipe.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { CategoryDisplayMap } from "../utils/sharedData";
import Cookies from "js-cookie";

export default function Recipe() {
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [servings, setServings] = useState();

    // Extract recipe ID from URL
    const recipe_id = window.location.pathname.split("/").pop();
    console.log(recipe_id);

    const get_recipe = async (id) => {
        const res = await fetch(`/myapp/recipe/${id}`, {
            method: "GET",
        });
        const json = await res.json();
        setRecipe(json);
        setIngredients(json.ingredients);
        setServings(json.servings);
        console.log("Fetched recipe:", json);
        console.log("Servings set to:", json.servings);
        console.log("servings state:", servings);
    }

    const delete_recipe = async (id) => {

        const csrfToken = Cookies.get("csrftoken");

        if (window.confirm("Möchten Sie dieses Rezept wirklich löschen?")) {
            const res = await fetch(`/myapp/recipe/${id}/delete`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });
            if (res.ok) {
                alert("Rezept erfolgreich gelöscht.");
                window.location.href = "/";
            } else {
                alert("Fehler beim Löschen des Rezepts.");
            }
        }
        else {
            return;
        }
    }

    useEffect(() => {
        get_recipe(recipe_id);
    }, [recipe_id]);

    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            <title>{recipe.title}</title>
            <div className="recipe-container">
                {recipe ? (
                    <div>
                        <img src={`/media/${recipe.image}`} alt={recipe.title} className="recipe-image" width={400} />
                        <h1>{recipe.title}</h1>
                        <div className="recipe-card-tags">
                            <span className="recipe-card-category">{recipe.category && CategoryDisplayMap.get(recipe.category).single}</span>
                            <span className="recipe-card-time">{recipe.time} Min.</span>
                        </div>
                        <h2>Zutaten</h2>
                        <label>Portionen:
                            <input
                                id="servings-input"
                                type="number"
                                name="servings" min="1" max="20" step="1"
                                value={servings}
                                onChange={(e) => setServings(e.target.value)}
                                style={{ width: "60px" }}
                            />
                        </label>
                        <table className="ingredients-table">
                            <tr>
                                <th>Zutat</th>
                                <th>Menge</th>
                            </tr>
                            {ingredients.map((ingredient) => (
                                <tr>
                                    <td>{ingredient.name}</td>
                                    <td>{Math.round(ingredient.amount * servings / recipe.servings)} {ingredient.unit}</td>
                                </tr>
                            ))}
                        </table>
                        <h2>Zubereitung</h2>
                        <div
                            className="instructions-container"
                            dangerouslySetInnerHTML={{ __html: recipe.instructions }} >
                        </div>
                        {isLoggedIn &&
                            <>
                                <button onClick={() => delete_recipe(recipe.id)} className="delete-button">Rezept löschen</button>
                                <a href={"/rezept/" + recipe.id + "/bearbeiten"} className="edit-button">Rezept bearbeiten</a>
                            </>
                        }
                    </div>
                ) : (<p className="loading-text">Lade Rezept...</p>)
                }
            </div>
        </>
    );
}