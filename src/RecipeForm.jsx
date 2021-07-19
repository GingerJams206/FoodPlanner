import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeForm({ recipe, handleChange, setRecipe }) {
  const [ingredients, setIngredients] = useState([])
  
  useEffect(() => {
    setIngredients(recipe?.ingredients || [])
  }, [recipe])

  const handleIngredientChange = (e) => {
    const { id, name, value } = e.target

    const changedIngredients = [...ingredients]
    changedIngredients.map((ingred, i) => {
      if (id.includes(ingred.id)) {
        ingred[name] = value
      }
    })

    setIngredients(changedIngredients)
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if (recipe.newIngredientName && recipe.newIngredientQty) {
      const newIngredient = {
        name: recipe.newIngredientName,
        qty: recipe.newIngredientQty,
        id: uuidv4()
      }

      
      setIngredients([...ingredients, newIngredient])
      recipe.ingredients = [...ingredients]
      recipe.ingredients.push(newIngredient)
      recipe['newIngredientName'] = ""
      recipe['newIngredientQty'] = ""
      setRecipe(recipe)
    }
  }

  return (
    <div>
      <h3>{recipe?.id ? 'Edit Recipe' : 'Add Recipe'}</h3>
      {/*<form onSubmit = {sendRecipe}> */}
      <form id="recipeForm">
        <input name='title' placeholder='title'
          value={recipe.title}
          onChange={handleChange} />
        <input name="description" value={recipe.description}
          placeholder="description"
          onChange={handleChange} />
        <ul style={{ listStyle: 'none' }}>
          {
            ingredients?.map((ingred, i) => {
              return (
                <li key={i} >
                  <input
                    name="name"
                    id={`name-${ingred.id}`}
                    className="ingredients name"
                    value={ingred?.name}
                    onChange={handleIngredientChange} />
                  <input
                    name="qty"
                    id={`qty-${ingred.id}`}
                    className="ingredients qty"
                    value={ingred?.qty}
                    onChange={handleIngredientChange} />
                </li>
              )
            })
          }
          <li>
            <input
              name="newIngredientName"
              className="ingredients name"
              placeholder="add ingredient name"
              value={recipe?.newIngredientName || ""}
              onChange={handleChange} />
            <input
              name="newIngredientQty"
              className="ingredients qty"
              placeholder="add ingredient qty"
              value={recipe?.newIngredientQty || ""}
              onChange={handleChange} />
          </li>
        </ul>
      </form>
      <button onClick={handleAddIngredient}>Add Ingredient</button>
    </div>
  )
}