import "../assets/styles.css";
import Header from "../Header/Header";
import RecipeForm from "./RecipeForm";
import Cookies from "js-cookie";

export default function CreateRecipe() {
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

    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <Header />
            <div className="max-width-800">
                <title>Neues Rezept</title>
                <h1>Rezept erstellen</h1>
                {/* Check if user is logged in */}
                {!isLoggedIn && <p>Bitte einloggen, um ein Rezept zu erstellen.</p>}
                {isLoggedIn &&
                    <RecipeForm onSubmit={handleCreate} />
                }
            </div>
        </>
    );
}