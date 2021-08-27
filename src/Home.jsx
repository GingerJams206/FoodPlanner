import React, { useState, useEffect } from 'react'
import * as RecipeContext from './contexts/RecipeContext.js'
import { Button, Modal } from 'semantic-ui-react'
import AddEditMeal from './modals/AddEditMeal'

import * as MealContext from './contexts/MealContext.js'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import RecipeCard from './components/RecipeCard.jsx'
import IngredientList from './modals/IngredientList.jsx'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [mealModalOpen, setMealModalOpen] = useState(false)
  const [listModalOpen, setListModalOpen] = useState(false)
  const recipes = RecipeContext.useRecipeContext()
  const meals = MealContext.useMealContext()

  const editMeal = MealContext.useMealUpdateContext()
  const addMeal = MealContext.useMealAddContext()
  const deleteMeal = MealContext.useMealDeleteContext()

  const initState = { recipe: '', mealType: '', date: moment().format('YYYY-MM-DD').toString() }
  const [meal, setMeal] = useState(initState)

  const [calendarMeals, setCalendarMeals] = useState([])
  const [targetedMeals, setTargetedMeals] = useState([])
  const [listIngredients, setListIngredients] = useState([])

  const localizer = momentLocalizer(moment)

  const handleAddMeal = (meal) => {
    addMeal(meal)
    setMeal(initState)
  }

  const handleEditMeal = (meal) => {
    editMeal(meal)
    setMeal(initState)
  }

  const handleDeleteMeal = (meal) => {
    deleteMeal(meal)
    setMeal(initState)
  }

  const handleSelectSlot = ({ start, end, resourceId }, calendarMeals) => {
    setTargetedMeals([])
    const rangeStart = new Date(moment(start).format('YYYY-MM-DD'));
    const rangeEnd = new Date(moment(end).format('YYYY-MM-DD'))

    const inRangeMeals = calendarMeals.filter(meal => meal.start >= rangeStart && meal.end <= rangeEnd)

    for (let meal of inRangeMeals) {
      const matchingRecipe = recipes.filter(recipe => meal.title.includes(recipe.title));
      setTargetedMeals(targetedMeals => ([...targetedMeals, matchingRecipe[0]]))
    }
  }

  const handleCreateList = () => {
    const ingredients = []
    setListIngredients([])
    for (let meal of targetedMeals) {
      meal.ingredients.map((ingred) => {
        const matchingIngreds = ingredients.filter(i => i.name === ingred.name);
        if (matchingIngreds.length === 0) ingredients.push({ name: ingred.name, qty: ingred.qty })
      })
    }
    setListIngredients(ingredients)
  }

  const clearIngredients = () => {
    setListIngredients([])
  }

  const clearMeal = () => {
    setMeal(initState)
  }

  const selectMeal = (id) => {
    const filteredMeal = meals.filter(meal => meal.id === id)
    const selectedMeal = filteredMeal[0]
    selectedMeal.date = moment(selectedMeal.date).format('YYYY-MM-DD').toString()
    setMeal(selectedMeal)
    setMealModalOpen(true)
  }

  const handleChange = (e, target) => {
    if (target?.name) {
      const { name, value } = target
      setMeal(prev => ({ ...prev, [name]: value }))
    } else {
      const eTarget = e.target
      const { name, value } = eTarget
      setMeal(prev => ({ ...prev, [name]: value }))
    }
  }

  const createMealFromRecipe = (recipe) => {
    const newMeal = initState

    newMeal.recipe = recipe.title
    setMeal(newMeal)
    setMealModalOpen(true)
  }

  useEffect(() => {
    setCalendarMeals([])
    meals?.map((meal) => {
      const calendarMeal = {
        id: meal.id,
        title: `${meal.mealType} - ${meal.recipe}`,
        allDay: false,
        start: new Date(meal.date),
        end: new Date(meal.date)
      }
      setCalendarMeals(calendarMeals => ([...calendarMeals, calendarMeal]))
    })
  }, [meals])

  return (
    <div id="home-page">
      <div id="meal-editing-pane">
        <div id="recipes-pane">
          {
            recipes?.length === 0 ?
              null :
              recipes.map((recipe, i) => <h1 key={i} onClick={() => createMealFromRecipe(recipe)} ><RecipeCard recipe={recipe} /></h1>)
          }
        </div>
        <Modal
          onClose={() => setListModalOpen(false)}
          onOpen={() => setListModalOpen(true)}
          open={listModalOpen}
          trigger={<Button id="showListModal-btn" onClick = {handleCreateList} size="small">Make List</Button>}
          size="tiny"
        >
          <IngredientList
            ingredients={listIngredients}
            toggleOpen={setListModalOpen}
            clearIngredients = {clearIngredients}
          />
        </Modal>
        <Modal
          onClose={() => setMealModalOpen(false)}
          onOpen={() => setMealModalOpen(true)}
          open={mealModalOpen}
          trigger={<Button id="showMealModal-btn" size="small">Add Meal</Button>}
          size="tiny"
        >
          <AddEditMeal
            recipes={recipes}
            meal={meal}
            toggleOpen={setMealModalOpen}
            handleChange={handleChange}
            clearMeal={clearMeal}
            addMeal={handleAddMeal}
            editMeal={handleEditMeal}
          />
        </Modal>
      </div>


      <div id="calendar-pane">
        <Calendar onSelectSlot={e => handleSelectSlot(e, calendarMeals)} events={calendarMeals} localizer={localizer} selectable onSelectEvent={event => selectMeal(event.id)} />
      </div>
    </div>
  )
}