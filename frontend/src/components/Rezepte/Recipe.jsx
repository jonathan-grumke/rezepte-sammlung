import "./Recipe.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";

export default function Recipe() {
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);

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
        console.log("Fetched recipe:", json);
    }

    const delete_recipe = async (id) => {
        if (window.confirm("Möchten Sie dieses Rezept wirklich löschen?")) {
            const res = await fetch(`/myapp/recipe/${id}/delete`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Rezept erfolgreich gelöscht.");
                window.location.href = "/rezepte";
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
            <div className="rezept-container">
                {recipe ? (
                    <div>
                        <h1>{recipe.title}</h1>
                        <h2>Zutaten</h2>
                        <p>Portionen: {recipe.servings}</p>
                        <table>
                            <tr>
                                <th>Menge</th>
                                <th>Zutat</th>
                            </tr>
                        </table>
                        {ingredients.map((ingredient) => (
                            <tr>
                                <td>{ingredient.amount} {ingredient.unit}</td>
                                <td>{ingredient.name}</td>
                            </tr>
                        ))}
                        <h2>Zubereitung</h2>
                        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} >
                        </div>
                        {isLoggedIn &&
                            <>
                                <button onClick={() => delete_recipe(recipe.id)} className="delete-button">Rezept löschen</button>
                                <a href={"/rezept/" + recipe.id + "/bearbeiten"} className="edit-button">Rezept bearbeiten</a>
                            </>
                        }
                    </div>
                ) : (<p>Lade Rezept...</p>)
                }
            </div>
        </>
    );
}