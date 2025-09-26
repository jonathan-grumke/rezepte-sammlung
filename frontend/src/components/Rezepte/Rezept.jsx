import "./Rezepte.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";

export default function Rezept() {
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
    }

    useEffect(() => {
        get_recipe(recipe_id);
    }, [recipe_id]);

    return (
        <>
            <Header />
            <title>{recipe.name}</title>
            <div className="rezept-container">
                {recipe ? (
                    <div>
                        <h1>{recipe.name}</h1>
                        <h2>Zutaten</h2>
                        <table>
                            <tr>
                                <th>Menge</th>
                                <th>Zutat</th>
                            </tr>
                        </table>
                        {ingredients.map((ingredient) => (
                            <tr>
                                <td>{ingredient.amount}</td>
                                <td>{ingredient.name}</td>
                            </tr>
                        ))}
                        <h2>Zubereitung</h2>
                        <p>{recipe.description}</p>
                    </div>
                ) : (<p>Lade Rezept...</p>)
                }
            </div>
        </>
    );
}