import React, { useState } from 'react'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './RecipeForm'
import { Container } from 'semantic-ui-react'
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

  const handleChange = e => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
  }


  return (
    <Container className="recipePageBody">
      <div>
        {
          recipes.length === 0 ?
            null :
            recipes.map((recipe, i) => <h1 key={i} onClick={() => setRecipe(recipe)}><RecipeCard recipe={recipe} /> </h1>)
        }
        <RecipeForm handleChange={handleChange} recipe={recipe} setRecipe={setRecipe} />
        <br />
        <button onClick={recipe?.id ? () => handleEditRecipe(recipe) : () => handleAddRecipe(recipe)}>{recipe?.id ? 'Update Recipe' : 'Add Recipe'}</button>
        <button onClick={clearRecipe}>Clear Recipe</button>
        <button onClick={() => handleDeleteRecipe(recipe)} disabled={recipe?.id ? false : true}>Delete Recipe</button>
      </div>

    </Container>
  )
}
