import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: Ingredient;
  ingredientName: keyof Ingredient;
}

interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  ingredientType: string;
  ingredientName: keyof Ingredient;
}

interface SetIngredientsAction {
  type: typeof SET_INGREDIENTS;
}

interface FetchIngredientsFailedAction {
  type: typeof FETCH_INGREDIENTS_FAILED;
}

export type ActionTypes =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetIngredientsAction
  | FetchIngredientsFailedAction;
