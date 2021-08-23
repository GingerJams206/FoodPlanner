import React from 'react';
import './RecipeCard.css'

function RecipeCard({ recipe, createMeal }) {
  return (
    <div className = "recipe-card">
      <h2 className = "card-title" onClick={() => createMeal(recipe)}> {recipe?.title}</h2>
      <span className = "card-description">{recipe?.description}</span>
    </div>
  )
}

export default RecipeCard;