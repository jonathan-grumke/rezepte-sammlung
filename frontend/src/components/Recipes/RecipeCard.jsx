import "./RecipeCard.css";
import "../assets/styles.css";
import Cta from "../Buttons/Cta";
import { CategoryDisplayMap } from "../../utils/sharedData";
import { useAuth } from "../../hooks/AuthProvider";
import { useEffect, useState } from "react";

export default function RecipeCard({ recipe }) {
    const [savedByUser, setSavedByUser] = useState(false);

    const auth = useAuth();

    const isRecipeSavedByUser = () => {
        if (auth.user?.authenticated && auth.user?.saved_recipes.some(r => r.id === recipe.id)) {
            setSavedByUser(true);
        }
    };

    useEffect(() => {
        isRecipeSavedByUser();
    }, [auth.user]);

    return (
        <div className="recipe-card">
            <a href={"/rezept/" + recipe.id}>
                <img src={`/media/${recipe.image}`}
                    alt={recipe.title}
                    className="recipe-card-hero" />
            </a>
            <div className="recipe-card-body">
                <a className="recipe-card-title" href={"/rezept/" + recipe.id}>{recipe.title}</a>
                <div className="recipe-card-meta">
                    <div className="recipe-card-tags">
                        <span className="recipe-card-tag">{CategoryDisplayMap.get(recipe.category).single}</span>
                        <span className="recipe-card-tag">{recipe.time} Min.</span>
                        {auth.user &&
                            (auth.user.authenticated && savedByUser) &&
                            <span className="recipe-card-tag">Gespeichert</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}