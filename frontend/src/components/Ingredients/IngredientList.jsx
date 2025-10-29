import React, { useState } from 'react';
import "./IngredientList.css";

export default function IngredientList({ ingredients, setIngredients }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddIngredient = () => {
        if (!name || !amount) return;

        if (editIndex !== null) {
            const updated = [...ingredients];
            updated[editIndex] = { name, amount, unit };
            setIngredients(updated);
            setEditIndex(null);
        } else {
            setIngredients([...ingredients, { name, amount, unit }]);
        }

        setName('');
        setAmount('');
        setUnit('');
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setName(ingredients[index].name);
        setAmount(ingredients[index].amount);
        setUnit(ingredients[index].unit);
    };

    const handleDelete = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <div className="">
            <label className="recipe-form--label">Zutaten:</label>
            <div className="ingredient-form">
                <input
                    type="text"
                    placeholder="Zutat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ingredient-form--input ingredient-form--name-input"
                />
                <input
                    type="number"
                    min={0}
                    placeholder="Menge"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="ingredient-form--input"
                />
                <input
                    type="text"
                    placeholder="Einheit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="ingredient-form--input"
                />
                <button type='button' onClick={handleAddIngredient}>
                    {editIndex !== null ?
                        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 13L9 17L19 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        :
                        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    }
                </button>
            </div>

            <div className="">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="">
                        <div className="ingredient-item">
                            <div>
                                <span className="ingredient-item--text">{ingredient.name} – {ingredient.amount} {ingredient.unit}</span>
                            </div>
                            <div className="ingredient-item--buttons">
                                <button className="ingredient-item--button" type='button' onClick={() => handleEdit(index)}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </button>
                                <button className='ingredient-item--button' type='button' onClick={() => handleDelete(index)}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
