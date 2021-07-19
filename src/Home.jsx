import React, { useState } from 'react'
import Calendar from 'react-calendar'
import * as RecipeContext from './RecipeContext'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const recipes = RecipeContext.useRecipeContext()


  return (
    <div id="home-page">
      <div id="recipes-pane">
        {
          recipes?.length === 0 ?
            null :
            recipes.map((recipe, i) => <h1 key={i} >{`${recipe.title}`}</h1>)
        }
      </div>
      <div id="calendar-pane">
        <Calendar />
      </div>
    </div>
  )
}