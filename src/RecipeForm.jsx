import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Modal, Form, Dropdown, Input } from 'semantic-ui-react'
import './RecipeForm.css'

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
      <Form id="recipe-form">
        <div id="recipe-title">
          <Form.Group widths = "equal">
            <Form.Field name='title' placeholder='title' control = 'input'
              value={recipe.title}
              onChange={handleChange} />
            <Form.Field name="description" value={recipe.description} control = 'input'
              placeholder="description"
              onChange={handleChange} />
          </Form.Group>
        </div>
        <div id="recipe-ingredients">
          {
            ingredients?.map((ingred, i) => {
              return (
                <Form.Group widths = "equal" key={i} >
                  <Form.Field
                    name="name"
                    id={`name-${ingred.id}`}
                    control = 'input'
                    className="ingredients name"
                    value={ingred?.name}
                    onChange={handleIngredientChange} />
                  <Form.Field
                    name="qty"
                    id={`qty-${ingred.id}`}
                    control = 'input'
                    className="ingredients qty"
                    value={ingred?.qty}
                    onChange={handleIngredientChange} />
                </Form.Group>
              )
            })
          }
          <Form.Group widths = "equal">
            <Form.Field
              name="newIngredientName"
              className="ingredients name"
              control = 'input'
              placeholder="add ingredient name"
              value={recipe?.newIngredientName || ""}
              onChange={handleChange} />
            <Form.Field
              name="newIngredientQty"
              className="ingredients qty"
              control = 'input'
              placeholder="add ingredient qty"
              value={recipe?.newIngredientQty || ""}
              onChange={handleChange} />
          </Form.Group>
        </div>
        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
      </Form>
      
    </div>
  )
}