import { Dispatch } from "redux";
import axios from "../../axios-orders";

import * as actionTypes from "./actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";

export const addIngredient = (name: string) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name: string) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients: Ingredient) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("https://burger-builder-c64cb.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error: Error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
