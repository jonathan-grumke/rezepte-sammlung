import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeCard from "./RecipeCard";
import { CategoryNameMap } from "../utils/sharedData";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    const recipes_url = "/myapp/recipes";

    const recipes_url_category = (category) => {
        return `${recipes_url}/${category}`;
    }

    const get_recipes = async () => {
        const res = await fetch(recipes_url, {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.recipes;
        let categories = [];
        recipes.forEach((recipe) => {
            categories.push(recipe.category);
        });
        categories = [...new Set(categories)];
        setRecipes(recipes);
        setCategories(categories);
    }

    const filter_by_category = async (category) => {
        let url;
        if (category === "all") {
            url = recipes_url;
        }
        else {
            url = recipes_url_category(category);
        }
        const res = await fetch(url, {
            method: "GET",
        });
        const json = await res.json();
        setRecipes(json.recipes);
    }

    useEffect(() => {
        get_recipes();
    }, []);

    const isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            <title>Rezepte</title>
            <div>
                <h1>Rezepte</h1>
                {isLoggedIn &&
                    <a href="/neues-rezept">Neues Rezept erstellen</a>
                }
                <label for="category">Kategorie
                    <select name="category" id="category" onChange={(e) => filter_by_category(e.target.value)}>
                        <option value="all" selected>Alle</option>
                        {categories.map((category) => (
                            <option value={category}>{CategoryNameMap.get(category).plural}</option>
                        ))}
                    </select>
                </label>
                {categories.map((category) => (
                    recipes.filter(recipe => recipe.category === category).length > 0 && (
                        <div key={category}>
                            <h2>{CategoryNameMap.get(category).plural}</h2>
                            <ul className="recipe-list">
                                {recipes.filter(recipe => recipe.category === category).map((recipe) => (
                                    <li key={recipe.id}>
                                        <RecipeCard recipe={recipe} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </>
    )

}