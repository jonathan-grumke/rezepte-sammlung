import { useEffect, useState } from "react";
import Header from "../Header/Header"
import RecipesList from "./RecipesList"
import { useAuth } from '../../hooks/AuthProvider';

export default function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([])

    const auth = useAuth();

    const getSavedRecipes = async () => {
        const res = await fetch("/myapp/user/saved_recipes", {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.saved_recipes;
        const publicRecipes = recipes.filter(recipe => recipe.published === true);
        setSavedRecipes(publicRecipes);
    }

    useEffect(() => {
        getSavedRecipes();
    }, []);

    return (
        <>
            <Header />
            <title>Gespeicherte Rezepte</title>
            <div className="max-width-800">
                <h1>Gespeicherte Rezepte</h1>
            </div>
            {savedRecipes.length > 0 ? (auth.user?.authenticated ? (
                <RecipesList recipes={savedRecipes} />
            ) : (
                <p>Bitte einloggen, um gespeicherte Rezept zu sehen.</p>
            )) : (
                <p className="max-width-800">Noch keine Rezepte gespeichert</p>
            )}
        </>
    )
}