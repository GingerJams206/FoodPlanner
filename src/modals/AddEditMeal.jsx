import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react'
import "./AddEditMeal.css"


export default function AddEditMeal({ recipes, toggleOpen, meal, handleChange, clearMeal, addMeal, editMeal }) {
  const [loading, setLoading] = useState(false)
  const [recipeOptions, setRecipeOptions] = useState([{ key: null, value: null, text: null }])
  const mealTypes = [
    {
      key: 0, value: 'Breakfast', text: 'Breakfast'
    },
    {
      key: 1, value: 'Lunch', text: 'Lunch'
    },
    {
      key: 2, value: 'Dinner', text: 'Dinner'
    }
  ]

  const handleCloseModal = () => {
    toggleOpen(false)
    clearMeal()
  }

  const saveMeal = () => {
    const { recipe, mealType } = meal
    if (recipe.length === 0 || mealType.length === 0) {
      alert("Please finish creating this meal!")
      return;
    }

    if (meal.id) {
      editMeal(meal)
    } else {
      addMeal(meal)
    }

    handleCloseModal()

  }

  useEffect(() => {
    for (let recipe of recipes) {
      const recipeOption = {
        key: recipe.id,
        value: recipe.title,
        text: recipe.title
      }
      setRecipeOptions(recipeOptions => ([...recipeOptions, recipeOption]))
    }
  }, [recipes])



  return (
    <>
      <Modal.Header>{meal.recipe ? "Edit Meal" : "Add Meal"}</Modal.Header>
      <Modal.Content id="addEditMeal-body">
        <Form>
          <Form.Field>
            <label>Recipe</label>
            <Dropdown options={recipeOptions}
              placeholder="Recipe..."
              fluid
              search
              selection
              value={meal.recipe}
              name="recipe"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Meal Type</label>
            <Dropdown options={mealTypes}
              placeholder="Meal Type..."
              fluid
              search
              selection
              value={meal.mealType}
              name="mealType"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="date">Date</label>
            <input type="date"
              value={meal.date}
              name="date"
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' color='black' onClick={handleCloseModal} />
        <Button
          content="Submit Meal"
          labelPosition='right'
          icon='checkmark'
          onClick={saveMeal}
          positive
        />
      </Modal.Actions>
    </>
  )
}