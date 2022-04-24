import React from 'react';
import './RecipeCard.css'

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card" id={recipe?.id}>
      <h2 className="card-title"> {recipe?.title}</h2>
      <span className="card-description">{recipe?.description}</span>
    </div>
  )
}

export default RecipeCard;