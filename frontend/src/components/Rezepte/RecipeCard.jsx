import "./RecipeCard.css";
import "../assets/styles.css";
import Cta from "../Buttons/Cta";
import { CategoryNameMap } from "../utils/sharedData";

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
                        <span className="recipe-card-category">{CategoryNameMap.get(recipe.category).single}</span>
                        <span className="recipe-card-time">30 Min.</span>
                    </div>
                    <div className="recipe-card-cta">
                        <Cta target={"/rezept/" + recipe.id} text="Zum Rezept" />
                    </div>
                </div>
            </div>
        </div>
    );
}