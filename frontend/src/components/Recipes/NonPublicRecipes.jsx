import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeCard from "./RecipeCard";
import { useAuth } from "../../hooks/AuthProvider";

export default function NonPublicRecipes() {
    const [recipes, setRecipes] = useState([]);
    const auth = useAuth();

    const recipesUrl = "/myapp/recipes";

    const getRecipes = async () => {
        const res = await fetch(recipesUrl, {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.recipes;
        const nonPublicRecipes = recipes.filter(recipe => recipe.published === false);
        setRecipes(nonPublicRecipes);
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            <Header />
            <title>Nicht veröffentlichte Rezepte</title>
            <div className="max-width-800 recipes-container">
                {(auth.user?.role === "admin" || auth.user?.role === "editor") ?
                    <>
                        <h1>Nicht veröffentlichte Rezepte</h1>
                        <ul className="recipe-list">
                            {recipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <RecipeCard recipe={recipe} />
                                </li>
                            ))}
                        </ul>
                    </>
                    : <p>Sie haben keine Berechtigung, diese Seite zu sehen.</p>
                }
            </div>
        </>
    )

}