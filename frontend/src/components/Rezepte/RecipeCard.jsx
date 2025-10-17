import "./RecipeCard.css";
import "../assets/styles.css";
import Cta from "../Buttons/Cta";

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img src="/uploads/2025-04-25 14.23.40.jpg" alt={recipe.title} className="recipe-card-hero" />
            <div className="recipe-card-body">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <div className="recipe-card-meta">
                </div>
                <div className="recipe-card-cta">
                    <Cta target={"/rezept/" + recipe.id} text="Zum Rezept" />
                </div>
            </div>
        </div>
    );
}