import React, { useState } from 'react'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './RecipeForm'
import { Container, Button } from 'semantic-ui-react'
import './Recipes.css'
import * as RecipeContext from './contexts/RecipeContext.js'

export default function Recipes() {
  const initState = { title: '', description: '', ingredients: [] }
  const [recipe, setRecipe] = useState(initState)

  const recipes = RecipeContext.useRecipeContext()
  const editRecipe = RecipeContext.useRecipeUpdateContext()
  const addRecipe = RecipeContext.useRecipeAddContext()
  const deleteRecipe = RecipeContext.useRecipeDeleteContext()

  const handleAddRecipe = (recipe) => {
    addRecipe(recipe)
    setRecipe(initState)
  }

  const handleEditRecipe = (recipe) => {
    editRecipe(recipe)
    setRecipe(initState)
  }

  const handleDeleteRecipe = (recipe) => {
    deleteRecipe(recipe)
    setRecipe(initState)
  }

  const clearRecipe = () => {
    setRecipe(initState)
  }

  const handleChange = (e, data) => {
    if (!data) {
      const { name, value } = e.target
      setRecipe(prev => ({ ...prev, [name]: value }))
    } else {
      const { name, checked, value } = data
      if (name === "newIngredientUnit") {
        setRecipe(prev => ({ ...prev, [name]: value }))
      } else {
        setRecipe(prev => ({ ...prev, [name]: checked }))
      }
    }
  }


  return (
    <Container id="recipes-page-container">
      <div id="recipe-page-body">
        <div id="recipe-edit-pane">
          <RecipeForm handleChange={handleChange} recipe={recipe} setRecipe={setRecipe} />
          <br />
          <Button onClick={recipe?.id ? () => handleEditRecipe(recipe) : () => handleAddRecipe(recipe)}>{recipe?.id ? 'Update Recipe' : 'Add Recipe'}</Button>
          <Button onClick={clearRecipe}>Clear Recipe</Button>
          <Button onClick={() => handleDeleteRecipe(recipe)} disabled={recipe?.id ? false : true}>Delete Recipe</Button>
        </div>
        <div id="recipe-list-pane">
          {
            recipes.length === 0 ?
              null :
              recipes.map((recipe, i) => <h1 key={i} onClick={() => setRecipe(recipe)}><RecipeCard recipe={recipe} /> </h1>)
          }
        </div>
      </div>
    </Container>
  )
}
