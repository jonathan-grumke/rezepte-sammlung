import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeForm from "./RecipeForm";

export default function CreateRecipe() {
    const handleCreate = async (formData) => {
        try {
            const res = await fetch("/myapp/recipe/create", {
                method: "POST",
                body: formData,
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