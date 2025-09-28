import React, { useState } from 'react';

export default function IngredientList({ ingredients, setIngredients }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddIngredient = () => {
        if (!name || !amount) return;

        if (editIndex !== null) {
            const updated = [...ingredients];
            updated[editIndex] = { name, amount };
            setIngredients(updated);
            setEditIndex(null);
        } else {
            setIngredients([...ingredients, { name, amount }]);
        }

        setName('');
        setAmount('');
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setName(ingredients[index].name);
        setAmount(ingredients[index].amount);
    };

    const handleDelete = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <div className="">
            <label className="">Zutaten:</label>
            <div className="">
                <input
                    type="text"
                    placeholder="Zutat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=""
                />
                <input
                    type="text"
                    placeholder="Menge"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className=""
                />
                <button type='button' onClick={handleAddIngredient}>
                    {editIndex !== null ? 'Speichern' : 'Hinzufügen'}
                </button>
            </div>

            <div className="">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="">
                        <div className="">
                            <div>
                                <span className="">{ingredient.name}</span> – {ingredient.amount}
                            </div>
                            <div className="">
                                <button type='button' onClick={() => handleEdit(index)}>
                                    Bearbeiten
                                </button>
                                <button type='button' onClick={() => handleDelete(index)}>
                                    Löschen
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
