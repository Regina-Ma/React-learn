// import {
//   ActionTypes,
//   ADD_INGREDIENT,
//   REMOVE_INGREDIENT,
// } from "../actions/actionTypes";
import * as actionTypes from "../actions/actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";

export interface InitialState {
  ingredients: Ingredient;
  totalPrice: number;
  error: boolean;
}

const initialState = {
  ingredients: {} as Ingredient,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES: Ingredient = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action: actionTypes.ActionTypes) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    default:
      return state;
  }
};

export default reducer;
