import React from 'react';

function RecipeCard({ recipe, createMeal }) {
  return (
    <>
      <span onClick={() => createMeal(recipe)}> {recipe?.title}</span>
    </>
  )
}

export default RecipeCard;