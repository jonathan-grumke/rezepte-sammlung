import "../assets/styles.css";
import Header from "../Header/Header";
import RecipeForm from "./RecipeForm";
import Cookies from "js-cookie";
import { useAuth } from '../../hooks/AuthProvider';

export default function CreateRecipe() {
    const auth = useAuth();

    const handleCreate = async (formData) => {
        const csrfToken = Cookies.get("csrftoken");

        try {
            const res = await fetch("/myapp/recipe/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
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

    return (
        <>
            <Header />
            <div className="max-width-800">
                <title>Neues Rezept</title>
                <h1>Rezept erstellen</h1>
                {/* Check if user is logged in */}
                {auth.user?.role != "admin" && <p>Bitte einloggen, um ein Rezept zu erstellen.</p>}
                {auth.user?.role == "admin" &&
                    <RecipeForm onSubmit={handleCreate} />
                }
            </div>
        </>
    );
}