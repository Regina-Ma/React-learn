import { Dispatch } from "redux";
import axios from "../../axios-orders";

// import * as actionTypes from "./actionTypes";
import {
  EnumActionTypes,
  AddIngredientAction,
  RemoveIngredientAction,
  SetIngredientsAction,
  FetchIngredientsFailedAction,
} from "./actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";

export const addIngredient = (name: string): AddIngredientAction => {
  return {
    type: EnumActionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name: string): RemoveIngredientAction => {
  return {
    type: EnumActionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

const setIngredients = (ingredients: Ingredient): SetIngredientsAction => {
  return {
    type: EnumActionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    // error: error ? true : false,
  };
};

const fetchIngredientsFailed = (error: Error): FetchIngredientsFailedAction => {
  return {
    type: EnumActionTypes.FETCH_INGREDIENTS_FAILED,
    error: error ? true : false,
  };
};

export const initIngredients = () => {
  return (dispatch: Dispatch) => {
    axios
      .get<Ingredient>(
        "https://burger-builder-c64cb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        dispatch<SetIngredientsAction>(setIngredients(response.data));
      })
      .catch((error: Error) => {
        dispatch<FetchIngredientsFailedAction>(fetchIngredientsFailed(error));
      });
  };
};
