import React, { useState } from "react";
import { CategoryDisplayMap } from "../utils/sharedData";
import "../assets/styles.css";
import "./CategorySelector.css";

export default function CategorySelector({ categories, onSelectCategory }) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleClick = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    }

    console.log("Categories in CategorySelector:", categories);

    return (
        <div className="flex-container">
            <div className="category-selector">
                <button
                    onClick={() => handleClick("all")}
                    className={`category-selector--category-button ${selectedCategory === "all" ? "selected" : ""}`}
                >
                    Alle Rezepte
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-selector--category-button ${selectedCategory === category ? "selected" : ""}`}
                        onClick={() => handleClick(category)}
                    >
                        <span className="category-selector--category-icon">{CategoryDisplayMap.get(category).icon} </span>{CategoryDisplayMap.get(category).plural}
                    </button>
                ))}
            </div>
        </div>
    );
}