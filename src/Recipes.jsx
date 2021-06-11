import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'semantic-ui-react'
import './Recipes.css'

import { useRecipeContext, useRecipeUpdateContext } from './RecipeContext'



export default function Recipes() {
  const recipes = useRecipeContext()
  const updateRecipes = useRecipeUpdateContext()

  useEffect(() => {
    //another test to make sure its working
    if (recipes) {
      setMyRecipes(recipes)
    }

  }, [recipes])

  const [myRecipes, setMyRecipes] = useState(null)
  const [recipe, setRecipe] = useState(null)
  return (
    <Container className="recipePageBody">
      <div>
        <h1>Hello</h1>
        <ul>
          {myRecipes?.map((recipe, i) => {
            console.log(recipe)

            return (<li key={i} onClick={() => { setRecipe(recipe) }}>{recipe.name}</li>)
          })
          }
        </ul>

        <span>
          {recipe?.ingredients.map((ingred, i) => {
            return ingred
          })}
        </span>
      </div>

    </Container>
  )
}
