import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/AuthProvider";
import RecipesList from "./RecipesList";

export default function UnpublishedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const auth = useAuth();

    const getUnpublishedRecipes = async () => {
        const res = await fetch("/myapp/recipes", {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.recipes;
        const unpublishedRecipes = recipes.filter(recipe => recipe.published === false);
        setRecipes(unpublishedRecipes);
    }

    useEffect(() => {
        getUnpublishedRecipes();
    }, []);

    return (
        <>
            <Header />
            <title>Unveröffentlichte Rezepte</title>
            <div className="max-width-800">
                <h1>Unveröffentlichte Rezepte</h1>
            </div>
            {(auth.user?.role === "admin" || auth.user?.role === "editor") ?
                <RecipesList recipes={recipes} />
                : <p className="max-width-800">Sie haben keine Berechtigung, diese Seite zu sehen.</p>
            }
        </>
    )

}