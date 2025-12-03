import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeCard from "./RecipeCard";
import { CategoryDisplayMap } from "../../utils/sharedData";
import CategoryBar from "../Header/CategorySelector";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const categories = [...CategoryDisplayMap.keys()];

    const recipesUrl = "/myapp/recipes";

    const recipesCategoryUrl = (category) => {
        return `${recipesUrl}/${category}`;
    }

    const getRecipes = async () => {
        const res = await fetch(recipesUrl, {
            method: "GET",
        });
        const json = await res.json();
        const recipes = json.recipes;
        const publicRecipes = recipes.filter(recipe => recipe.published === true);
        setRecipes(publicRecipes);
    }

    const filterByCategory = async (category) => {
        let url;
        if (category === "all") {
            url = recipesUrl;
        }
        else {
            url = recipesCategoryUrl(category);
        }
        const res = await fetch(url, {
            method: "GET",
        });
        const json = await res.json();
        const publicRecipes = json.recipes.filter(recipe => recipe.published === true);
        setRecipes(publicRecipes);
    }

    const handleCategorySelect = (category) => {
        filterByCategory(category);
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            <Header />
            <title>Rezepte</title>
            <CategoryBar categories={categories} onSelectCategory={handleCategorySelect} />
            <div className="max-width-800 recipes-container">
                {categories.map((category) => (
                    recipes.filter(recipe => recipe.category === category).length > 0 && (
                        <div key={category}>
                            <h2>
                                <span className="recipe-list--category-icon">{CategoryDisplayMap.get(category).icon}</span>
                                {CategoryDisplayMap.get(category).plural}
                            </h2>
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