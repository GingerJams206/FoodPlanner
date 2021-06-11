import React, { useEffect, useState } from 'react'
import firebase from "./firebase/index"
import RecipeCard from './components/RecipeCard'
import RecipeForm from './RecipeForm'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const db = firebase.db
 // const initState = { title: '', description: '', ingredients: [{name: '', description: '', id: Math.random()}] };
  const initState = { title: '', description: '', ingredients: [] }
  const [recipe, setRecipe] = useState(initState)

  useEffect(() => {
    setRecipes([])
    getRecipes()
  }, [])


  const getRecipes = () => {
    db.collection('recipes').get()
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

  const sendRecipe = async (e) => {
    e.preventDefault();
    await db.collection('recipes').add(recipe)
      .then(async documentReference => {
        console.log("document reference ID", documentReference.id)
        await setRecipes([])
        setRecipe(initState)
        getRecipes()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
    console.log(recipe)
  }

  return (
    <div>
      <h1>Home Page</h1>
      {
        recipes.length === 0 ?
          null :
          recipes.map((recipe, i) => <h1 key={i} onClick={() => setRecipe(recipe)}><RecipeCard recipe={recipe} /> </h1>)
      }
      <RecipeForm handleChange={handleChange} recipe={recipe} />
      <br/>
      <button onClick = {sendRecipe}>Submit Recipe</button>
    </div>
  )
}