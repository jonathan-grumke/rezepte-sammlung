import "../assets/styles.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import RecipeForm from "./RecipeForm";
import { getCSRF } from "../utils/auth";

export default function EditRecipe() {
    // Extract recipe ID from URL
    const recipe_id = window.location.pathname.split("/").at(-2);
    console.log(recipe_id);
    console.log("Editing recipe with ID:", recipe_id);

    const [initialData, setInitialData] = useState(null);

    const fetchRecipe = async (id) => {
        try {
            const res = await fetch(`/myapp/recipe/${id}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch recipe");
            }
            const json = await res.json();
            console.log("Fetched recipe data:", json);
            setInitialData(json);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    const handleUpdate = async (formData) => {
        const { csrfToken } = await getCSRF();
        try {
            const res = await fetch(`/myapp/recipe/${recipe_id}/update`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to update recipe");
            }

            const updatedRecipe = await res.json();
            console.log("Recipe updated successfully:", updatedRecipe);
            alert("Rezept erfolgreich aktualisiert!");
            window.location.href = `/rezept/${recipe_id}`;
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (recipe_id) {
            fetchRecipe(recipe_id);
        }
    }, [recipe_id]);

    return (
        <>
            <Header />
            <div className="max-width-800">
                <h1>Rezept bearbeiten</h1>
                {initialData ? (
                    <>
                        <RecipeForm initialData={initialData} onSubmit={handleUpdate} />
                    </>
                ) : (
                    <p>Lade Rezeptdaten...</p>
                )}
            </div>
        </>
    );
}