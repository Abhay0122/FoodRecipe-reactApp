import CardRecipe from './components/CardRecipe/CardRecipe';
import React, { useState, createContext } from 'react'
import "./App.css";
import Header from "./components/header/Header";
import ListRecipe from './components/ListRecipe/ListRecipe';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeInfo from './components/RecipeInfo/RecipeInfo';
import { Grid } from '@material-ui/core';

export const ActivedRecipe = createContext();

const App = () => {
  const [isGrid, setisGrid] = useState(true);
  const [isAddRecipe, setAddRecipe] = useState(false);
  const [isRecipeInfo, setRecipeInfo] = useState(false);
  const [activeRecipe, setactiveRecipe] = useState('');
  const [Recipes, setRecipes] = useState([
    {
      date: "25-mar-2023, 11:30:49 PM", dish: "Mediterranean Salad", chef: "Eiliv Aceron",
      ingredientsArray: ['cucumbers', 'peppers', 'tomatoes', 'onions', 'carrots', 'celery', 'radishes'], description: "It is an everyday salad made typically of three key ingredients: tomatoes, cucumbers, and parsley and seasoned simply with kosher salt, although I like to add sumac for a little tang and depth.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      date: "26-mar-2023, 12:30:49 PM", dish: "Seafood pasta", chef: "Olayinka Babalol", ingredientsArray: ['shrimp', 'clams', 'mussels', 'scallops'], description: "This seafood pasta is a mix of shrimp, clams, mussels and scallops, all tossed together with spaghetti in a homemade tomato sauce. An easy yet elegant meal that's perfect for entertaining.", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
  ]);

  const onGridHandler = () => {
    setisGrid(!isGrid);
  };

  const onAddRecipeHandler = () => {
    onHomeHandler();
    setAddRecipe(true);
  };

  const onHomeHandler = () => {
    setAddRecipe(false);
    setRecipeInfo(false);
    setactiveRecipe('');
  }

  const onDeleteActiveRecipe = (date) => {
    const recipes = Recipes.filter(r => r.date !== date)
    setRecipes(recipes);
    onHomeHandler();
  }

  const onSaveRecipeHandler = (recipe) => {
    if (!recipe.date)
      recipe.date = new Date().toLocaleDateString('default', { year: "numeric", month: "long", day: "numeric" }) + " " + new Date().toLocaleTimeString();

    let ingredientsArray = recipe.ingredients.split(",");
    recipe.ingredientsArray = ingredientsArray;
    delete recipe.ingredients;
    delete recipe.onSubmit;

    let RecipeIndex = Recipes.findIndex(r => r.date === recipe.date);
    let recipies = [...Recipes];

    if (RecipeIndex === -1) recipies.push(recipe)
    else recipies[RecipeIndex] = recipe;

    setRecipes(recipies);
    onHomeHandler();
  }

  let displayContent = '';
  if (isGrid) displayContent = Recipes.map((recipe, idx) => (
    <CardRecipe key={recipe.date} Recipe={recipe}
      RecipeInfoHandler={() => {
        setRecipeInfo(true);
        setactiveRecipe(Recipes[idx]);
      }}
    />
  ))
  if (!isGrid) displayContent = Recipes.map((recipe, idx) => (
    <ListRecipe key={recipe.date} Recipe={recipe}
      RecipeInfoHandler={() => {
        setRecipeInfo(true);
        setactiveRecipe(Recipes[idx]);
      }}
    />
  ))
  if (isAddRecipe) displayContent = <ActivedRecipe.Provider value={activeRecipe}>
    <AddRecipe
      HomeHandler={onHomeHandler}
      fetchRecipe={(recipe) => onSaveRecipeHandler(recipe)}
    />
  </ActivedRecipe.Provider>

  if (isRecipeInfo) displayContent = <ActivedRecipe.Provider value={activeRecipe}>
    <RecipeInfo
      HomeHandler={onHomeHandler}
      deleteActiveRecipe={(date) => onDeleteActiveRecipe(date)}
      fetchRecipe={(recipe) => onSaveRecipeHandler(recipe)}
    />
  </ActivedRecipe.Provider>


  return (
    <div>
      <Header
        GridStatus={isGrid}
        GridHandler={onGridHandler}
        AddRecipeHandler={onAddRecipeHandler}
        AddRecipeStatus={isAddRecipe}
        RecipeInfoStatus={isRecipeInfo}
      />

      <Grid container>
        <Grid item sm={1}></Grid>
        <Grid direction={isGrid ? 'row' : 'column'} container item sm={10}>
          {displayContent}
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>

    </div>
  )
}

export default App;