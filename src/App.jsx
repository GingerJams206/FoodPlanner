import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Recipes from './Recipes';
import Home from './Home';
import { RecipeProvider } from './contexts/RecipeContext.js'
import { MealProvider } from './contexts/MealContext.js'
import './App.css';
import 'react-calendar/dist/Calendar.css';

export default function App() {

  return (
    <Router>
      <MealProvider>
        <RecipeProvider>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/recipes" component={Recipes} />
              {/*<Route path="/selections" component={Recipes} /> */}
            </Switch>
          </div>
        </RecipeProvider>
      </MealProvider>
    </Router>
  );
};
