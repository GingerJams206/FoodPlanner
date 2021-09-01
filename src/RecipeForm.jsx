import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Modal, Form, Dropdown, Input, Checkbox } from 'semantic-ui-react'
import './RecipeForm.css'

export default function RecipeForm({ recipe, handleChange, setRecipe }) {
  const [ingredients, setIngredients] = useState([])

  const unitOptions = [

    { key: 'teaspoon', text: 'Teaspoon(s)', value: 'teaspoon' },
    { key: 'tablespoon', text: 'Tablespoon(s)', value: 'tablespoon' },
    { key: 'dry-cup', text: 'Cup(s)', value: 'dry-cup' },
    { key: 'dry-pound', text: 'Pound(s)', value: 'dry-pound' },

    { key: 'liquid-cup', text: 'Cup(s) (liq)', value: 'liquid-cup' },
    { key: 'liquid-pint', text: 'Pint(s) (liq)', value: 'liquid-pint' },
    { key: 'liquid-quart', text: 'Quart(s) (liq)', value: 'liquid-quart' },
    { key: 'liquid-gallon', text: 'Gallon(s) (liq)', value: 'liquid-gallon' }
  ]


  useEffect(() => {
    setIngredients(recipe?.ingredients || [])
  }, [recipe])

  const handleIngredientChange = (e, data) => {
    const changedIngredients = [...ingredients]
    if (!data) {
      const { id, name, value } = e.target
      changedIngredients.map((ingred, i) => {
        if (id.includes(ingred.id)) {
          ingred[name] = value
        }
      })
    } else {
      const { id, name, checked, value } = data
      if (name === "unit") {
        changedIngredients.map((ingred, i) => {
          if (id.includes(ingred.id)) {
            ingred[name] = value
          }
        })
      } else {
        changedIngredients.map((ingred, i) => {
          if (id.includes(ingred.id)) {
            ingred[name] = checked
          }
        })
      }

    }
    setIngredients(changedIngredients)
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if (recipe.newIngredientName && recipe.newIngredientQty) {
      const newIngredient = {
        name: recipe.newIngredientName,
        qty: recipe.newIngredientQty,
        unit: recipe.newIngredientUnit,
        customUnitBool: recipe.customUnitBool,
        id: uuidv4()
      }


      setIngredients([...ingredients, newIngredient])
      recipe.ingredients = [...ingredients]
      recipe.ingredients.push(newIngredient)
      delete recipe.newIngredientName
      delete recipe.newIngredientQty
      delete recipe.newIngredientUnit
      setRecipe(recipe)
    }
  }

  return (
    <div>
      <h3>{recipe?.id ? 'Edit Recipe' : 'Add Recipe'}</h3>
      <Form id="recipe-form">
        <div id="recipe-title">
          <Form.Group widths="equal">
            <Form.Field name='title' placeholder='title' control='input'
              value={recipe.title}
              onChange={handleChange} />
            <Form.Field name="description" value={recipe.description} control='input'
              placeholder="description"
              onChange={handleChange} />
          </Form.Group>
        </div>
        <div id="recipe-ingredients">
          {
            ingredients?.map((ingred, i) => {
              return (
                <Form.Group widths="equal" key={i} >
                  <Form.Field
                    name="name"
                    id={`name-${ingred.id}`}
                    control='input'
                    className="ingredients name"
                    value={ingred?.name}
                    onChange={handleIngredientChange} />
                  <Form.Field
                    name="qty"
                    id={`qty-${ingred.id}`}
                    control='input'
                    className="ingredients qty"
                    value={ingred?.qty}
                    onChange={handleIngredientChange} />
                  <Form.Field>
                    < Checkbox id={`custom-flag-${ingred.id}`} toggle label="Set Custom Unit" name="customUnitBool"
                      checked={ingred?.customUnitBool} onChange={handleIngredientChange} />
                  </Form.Field>
                  {
                    ingred?.customUnitBool ?
                      <Form.Field
                        name="unit"
                        id={`unit-${ingred.id}`}
                        control='input'
                        placeholder="Add Unit of Measurement"
                        className="ingredients unit"
                        value={ingred?.unit}
                        onChange={handleIngredientChange} /> :
                      <Dropdown
                        name="unit"
                        fluid
                        selection
                        id={`unit-${ingred.id}-dropdown`}
                        className="ingredients unit"
                        value={ingred?.unit}
                        placeholder="Select Unit of Measurement"
                        onChange={handleIngredientChange}
                        options={unitOptions} />
                  }


                </Form.Group>
              )
            })
          }
          <Form.Group widths="equal">
            <Form.Field
              name="newIngredientName"
              className="ingredients name"
              control='input'
              placeholder="add ingredient name"
              value={recipe?.newIngredientName || ""}
              onChange={handleChange} />
            <Form.Field
              name="newIngredientQty"
              className="ingredients qty"
              control='input'
              placeholder="add ingredient qty"
              value={recipe?.newIngredientQty || ""}
              onChange={handleChange} />
            <Form.Field>
              <Checkbox toggle label="Set Custom Unit" name="customUnitBool"
                defaultChecked={false} checked={recipe?.customUnitBool} onChange={handleChange} />
            </Form.Field>

            {
              recipe?.customUnitBool === true ?
                <Form.Field
                  name="newIngredientUnit"
                  control='input'
                  className="ingredients unit"
                  placeholder="add ingredient unit"
                  value={recipe?.newIngredientUnit || ""}
                  onChange={handleChange} /> :
                <Dropdown
                  name="newIngredientUnit"
                  fluid
                  selection
                  className="ingredients unit"
                  value={recipe?.newIngredientUnit || ""}
                  placeholder="add ingredient unit"
                  onChange={handleChange}
                  options={unitOptions} />
            }
          </Form.Group>
        </div>
        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
      </Form>

    </div>
  )
}