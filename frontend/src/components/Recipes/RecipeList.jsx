import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { CategoryDisplayMap } from "../../utils/sharedData";
import CategoryBar from "../Header/CategorySelector";
import "../assets/styles.css";
import "./Recipes.css";

export default function RecipeList({ recipes }) {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const categories = [...CategoryDisplayMap.keys()];

    const filterByCategory = (selectedCategory) => {
        if (selectedCategory === "all") {
            setFilteredRecipes(recipes);
            return;
        }
        const filteredRecipes = recipes.filter(recipe => recipe.category === selectedCategory);
        setFilteredRecipes(filteredRecipes);
    }

    const handleCategorySelect = (selectedCategory) => {
        filterByCategory(selectedCategory);
    };

    return (
        <>
            <CategoryBar categories={categories} onSelectCategory={handleCategorySelect} />
            <div className="max-width-800 recipes-container">
                {categories.map((category) => (
                    filteredRecipes.filter(recipe => recipe.category === category).length > 0 && (
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