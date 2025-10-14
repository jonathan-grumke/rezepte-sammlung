import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeForm from "./RecipeForm";

export default function CreateRezept() {
    const handleCreate = async ({ name, category, description, ingredients }) => {

        let data = {
            "name": name,
            "category": category,
            "description": description,
            "ingredients": ingredients
        };
        try {
            const res = await fetch("/myapp/recipe/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to create recipe");
            }

            const newRecipe = await res.json();
            console.log("Recipe created successfully:", newRecipe);
            alert("Rezept erfolgreich erstellt!");
            window.location.href = `/rezept/${newRecipe.id}`;
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            <title>Neues Rezept</title>
            <h1>Rezept erstellen</h1>
            {/* Check if user is logged in */}
            {!isLoggedIn && <p>Bitte einloggen, um ein Rezept zu erstellen.</p>}
            {isLoggedIn &&
                <RecipeForm onSubmit={handleCreate} />
            }
        </>
    );
}