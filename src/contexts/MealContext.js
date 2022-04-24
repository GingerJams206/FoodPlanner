import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import firebase from "../firebase/index"

const MealsContext = React.createContext();
const MealUpdateContext = React.createContext();
const MealAddContext = React.createContext();
const MealDeleteContext = React.createContext();

const db = firebase.db
const fbMeals = db.collection('meals')

export function useMealContext() {
  return useContext(MealsContext)
}

export function useMealUpdateContext() {
  return useContext(MealUpdateContext)
}

export function useMealAddContext() {
  return useContext(MealAddContext)
}

export function useMealDeleteContext() {
  return useContext(MealDeleteContext)
}

export function MealProvider({ children }) {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    console.log("here - meal context")
    setMeals([])
    getMeals()
  }, [])

  const getMeals = () => {
    fbMeals.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setMeals(prev => ([...prev, doc.data()]))
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const editMeal = (meal) => {
    meal.date = moment(meal.date).format();
    fbMeals.doc(meal.id)
      .update(meal)
      .then(() => {
        setMeals([])
        getMeals()
      })
      .catch((err) => {
        console.error(err)
      });
  }

  const addMeal = async (meal) => {

    meal.id = uuidv4();
    meal.date = moment(meal.date).format();
    await fbMeals.doc(meal.id)
      .set(meal)
      .then(() => {
        setMeals([])
        getMeals()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const deleteMeal = (meal) => {
    fbMeals.doc(meal.id).delete()
      .then(() => {
        setMeals([])
        getMeals()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <MealsContext.Provider value={meals}>
      <MealUpdateContext.Provider value={editMeal}>
        <MealAddContext.Provider value={addMeal}>
          <MealDeleteContext.Provider value={deleteMeal}>
            {children}
          </MealDeleteContext.Provider>
        </MealAddContext.Provider>
      </MealUpdateContext.Provider>
    </MealsContext.Provider>
  )
}