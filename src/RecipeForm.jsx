import React, { useEffect, useState } from 'react'
import firebase from "./firebase/index"

export default function RecipeForm({ recipe, handleChange }) {
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

  return (
    <div>
      <h3>Add Recipe</h3>
      {/*<form onSubmit = {sendRecipe}> */}
      <form id="recipeForm">
        <input name='title'
          placeholder='title'
          value={recipe.title}
          onChange={handleChange} />
        <input name="description"
          value={recipe.description}
          placeholder="description"
          onChange={handleChange} />
        <ul>
          {
            ingredients?.map((ingred, i) => {
              return (
                <li key={i}>
                  <input
                    name = "name"
                    id = {`name-${ingred.id}`}
                    className="ingredients name"
                    value={ingred?.name}
                    onChange={handleIngredientChange} />
                  <input
                    name = "qty"
                    id = {`qty-${ingred.id}`}
                    className="ingredients qty"
                    value={ingred?.qty}
                    onChange={handleIngredientChange} />
                </li>
              )
            })
          }
          <li>
            <input
              name="new ingredient name"
              className="ingredients name"
              placeholder="add ingredient name"
              onChange={handleChange} />
            <input
              name="new ingredient qty"
              className="ingredients qty"
              placeholder="add ingredient qty"
              onChange={handleChange} />
          </li>
        </ul>
      </form>
      <button>Add Ingredient</button>
      {/* <button onClick={sendRecipe}>click here to send</button> */}
    </div>
  )
}