import "./RecipeCard.css";
import "../assets/styles.css";
import Cta from "../Buttons/Cta";
import { CategoryDisplayMap } from "../utils/sharedData";

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img src={`/media/${recipe.image}`}
                alt={recipe.title}
                className="recipe-card-hero" />
            <div className="recipe-card-body">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <div className="recipe-card-meta">
                    <div className="recipe-card-tags">
                        <span className="recipe-card-category">{CategoryDisplayMap.get(recipe.category).single}</span>
                        <span className="recipe-card-time">{recipe.time} Min.</span>
                    </div>
                    <div className="recipe-card-cta">
                        <Cta target={"/rezept/" + recipe.id} text="Zum Rezept" />
                    </div>
                </div>
            </div>
        </div>
    );
}