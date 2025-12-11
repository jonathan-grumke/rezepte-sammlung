import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeList from "./RecipeList";

export default function Recipes() {
    const [recipes, setRecipes] = useState(null);

    const getRecipes = async () => {
        const res = await fetch("/myapp/recipes", {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.recipes;
        const publicRecipes = recipes.filter(recipe => recipe.published === true);
        setRecipes(publicRecipes);
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            <Header />
            <title>Rezepte</title>
            {recipes && <RecipeList recipes={recipes} />}
        </>
    )

}