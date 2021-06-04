import React, {useContext, useState} from 'react'

const RecipeContext = React.createContext();
const RecipeUpdateContext = React.createContext();

export function useRecipeContext() {
    return useContext(RecipeContext)
}

export function useRecipeUpdateContext() {
    return useContext(RecipeUpdateContext)
}

export function RecipeProvider({children}) {
    const [sampleRecipes, setSampleRecipes] = useState([
            {
                name: 'Chicken and Waffles',
                ingredients: ['chicken', 'waffles', 'butter'],
                costToMake: 8.00
            },
            {
                name: 'Scrambled Eggs',
                ingredients: ['eggs', 'butter', 'cheese'],
                costToMake: 3.00
            }
        ])

        function updateRecipes() {
            console.log("From update")
            // Easy git test yay
            // update logic here
            // setSampleRecipes stuff and all that
        }

    return (
        <RecipeContext.Provider value = {sampleRecipes}>
            <RecipeUpdateContext.Provider value = {updateRecipes}>
                {children}
            </RecipeUpdateContext.Provider>
        </RecipeContext.Provider>
    )
}