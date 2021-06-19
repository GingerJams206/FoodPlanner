import React, { useEffect, useState } from 'react'
import firebase from "./firebase/index"
import RecipeCard from './components/RecipeCard'
import RecipeForm from './RecipeForm'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const db = firebase.db
  const fbRecipes = db.collection('recipes')
  // const initState = { title: '', description: '', ingredients: [{name: '', description: '', id: Math.random()}] };
  const initState = { title: '', description: '', ingredients: [] }
  const [recipe, setRecipe] = useState(initState)

  useEffect(() => {
    setRecipes([])
    getRecipes()
  }, [])


  const getRecipes = () => {
    fbRecipes.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setRecipes(prev => ([...prev, doc.data()]))
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }
  //console.log(firebase)

  const addRecipe = async (e) => {
    e.preventDefault();
    console.log(recipe)
    if (recipe.ingredients.length === 0) return
    
    recipe.id = uuidv4();
    console.log(recipe)
    await fbRecipes.doc(recipe.id)
      .set(recipe)
      .then(() => {
        setRecipes([])
        setRecipe(initState)
        getRecipes()})
      .catch(error => {
        console.log(error.message)
      })
  }

  const clearRecipe = () => {
    setRecipe(initState)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
  }

  const deleteRecipe = () => {
    fbRecipes.doc(recipe.id).delete()
      .then(() => {
        setRecipes([])
        setRecipe(initState)
        getRecipes()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const editRecipe = () => {
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

  return (
    <div>
      <h1>Home Page</h1>
      {
        recipes.length === 0 ?
          null :
          recipes.map((recipe, i) => <h1 key={i} onClick={() => setRecipe(recipe)}><RecipeCard recipe={recipe} /> </h1>)
      }
      <RecipeForm handleChange={handleChange} recipe={recipe} setRecipe = {setRecipe} />
      <br />
      <button  onClick={recipe?.id ? editRecipe : addRecipe}>{recipe?.id ? 'Update Recipe' : 'Add Recipe'}</button>
      <button onClick={clearRecipe}>Clear Recipe</button>
      <button onClick={deleteRecipe} disabled = {recipe?.id ? false : true}>Delete Recipe</button>
    </div>
  )
}