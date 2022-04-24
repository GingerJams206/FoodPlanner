import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import firebase from "../firebase/index"

const RecipesContext = React.createContext();
const RecipeUpdateContext = React.createContext();
const RecipeAddContext = React.createContext();
const RecipeDeleteContext = React.createContext();

const db = firebase.db
const fbRecipes = db.collection('recipes')

export function useRecipeContext() {
  return useContext(RecipesContext)
}

export function useRecipeUpdateContext() {
  return useContext(RecipeUpdateContext)
}

export function useRecipeAddContext() {
  return useContext(RecipeAddContext)
}

export function useRecipeDeleteContext() {
  return useContext(RecipeDeleteContext)
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    console.log("here - recipe context")
    getRecipes()
  }, [fbRecipes])

  const getRecipes = () => {
    let docRecipes = [] // TODO: This is a fix for the data loading twice
    fbRecipes.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const recipe = doc.data()
          docRecipes = [...docRecipes, recipe]
        })
        setRecipes(docRecipes)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const editRecipe = (recipe) => {
    fbRecipes.doc(recipe.id)
      .update(recipe)
      .then(() => {
        setRecipes([])
        getRecipes()
      })
      .catch((err) => {
        console.error(err)
      });
  }

  const addRecipe = async (recipe) => {
    if (recipe.ingredients.length === 0) return

    recipe.id = uuidv4();
    await fbRecipes.doc(recipe.id)
      .set(recipe)
      .then(() => {
        setRecipes([])
        getRecipes()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const deleteRecipe = (recipe) => {
    fbRecipes.doc(recipe.id).delete()
      .then(() => {
        setRecipes([])
        getRecipes()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <RecipesContext.Provider value={recipes}>
      <RecipeUpdateContext.Provider value={editRecipe}>
        <RecipeAddContext.Provider value={addRecipe}>
          <RecipeDeleteContext.Provider value={deleteRecipe}>
            {children}
          </RecipeDeleteContext.Provider>
        </RecipeAddContext.Provider>
      </RecipeUpdateContext.Provider>
    </RecipesContext.Provider>
  )
}