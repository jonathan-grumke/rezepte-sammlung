import "./Recipes.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeCard from "./RecipeCard";
import { CategoryDisplayMap } from "../utils/sharedData";
import CategoryBar from "../Header/CategorySelector";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    // const [categories, setCategories] = useState([]);
    const categories = [...CategoryDisplayMap.keys()];
    const [selectedCategory, setSelectedCategory] = useState("all");


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
        // let categories = [];
        // recipes.forEach((recipe) => {
        //     categories.push(recipe.category);
        // });
        // categories = [...new Set(categories)];
        setRecipes(recipes);
        // setCategories(categories);
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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        filter_by_category(category);
    };

    useEffect(() => {
        get_recipes();
    }, []);

    const isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

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