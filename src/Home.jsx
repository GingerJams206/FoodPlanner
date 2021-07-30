import React, { useState, useEffect } from 'react'
import * as RecipeContext from './contexts/RecipeContext.js'
import { Button, Modal } from 'semantic-ui-react'
import AddEditMeal from './modals/AddEditMeal'

import * as MealContext from './contexts/MealContext.js'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [mealModalOpen, setMealModalOpen] = useState(false)
  const recipes = RecipeContext.useRecipeContext()
  const meals = MealContext.useMealContext()

  const editMeal = MealContext.useMealUpdateContext()
  const addMeal = MealContext.useMealAddContext()
  const deleteMeal = MealContext.useMealDeleteContext()

  const initState = { recipe: '', mealType: '', date: moment().format('YYYY-MM-DD').toString() }
  const [meal, setMeal] = useState(initState)

  const [calendarMeals, setCalendarMeals] = useState([])
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
      <div id="recipes-pane">
        {
          recipes?.length === 0 ?
            null :
            recipes.map((recipe, i) => <h1 key={i} >{`${recipe.title}`}</h1>)
        }
        <Modal
          onClose={() => setMealModalOpen(false)}
          onOpen={() => setMealModalOpen(true)}
          open={mealModalOpen}
          trigger={<Button id="showMealModal-btn" size="small">Show Modal</Button>}
          size="tiny"
        >
          <AddEditMeal
            recipes={recipes}
            meal={meal}
            toggleOpen={setMealModalOpen}
            handleChange={handleChange}
            clearMeal={clearMeal}
            addMeal={handleAddMeal}
          />
        </Modal>
      </div>
      <div id="calendar-pane">
        <Calendar events={calendarMeals} localizer={localizer} selectable onSelectEvent={event => selectMeal(event.id)} />
      </div>
    </div>
  )
}