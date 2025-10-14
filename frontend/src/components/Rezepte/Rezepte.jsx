import "./Rezepte.css";
import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";

export default function Rezepte() {
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

    const category_name_map = new Map([
        ["main", "Hauptgerichte"],
        ["dessert", "Desserts"],
        ["snack", "Snacks"],
        ["drink", "Getränke"],
        ["soup", "Suppen"],
        ["salad", "Salate"]
    ]);

    useEffect(() => {
        get_recipes();
    }, []);

    const isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            <title>Rezepte</title>
            <label for="category">Kategorie</label>
            <select name="category" id="category" onChange={(e) => filter_by_category(e.target.value)}>
                <option value="all" selected>Alle</option>
                {categories.map((category) => (
                    <option value={category}>{category_name_map.get(category)}</option>
                ))}
            </select>
            <div>
                <h1>Rezepte</h1>
                {categories.map((category) => (
                    recipes.filter(recipe => recipe.category === category).length > 0 && (
                        <div key={category}>
                            <h2>{category_name_map.get(category)}</h2>
                            <ul>
                                {recipes.filter(recipe => recipe.category === category).map((recipe) => (
                                    <li key={recipe.id}>
                                        <a href={"/rezept/" + recipe.id}>{recipe.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
            {isLoggedIn &&
                <a href="/neues-rezept">Neues Rezept erstellen</a>
            }
        </>
    )

}