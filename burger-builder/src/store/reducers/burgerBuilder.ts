import { EnumActionTypes, UnionActions } from "../actions/actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
import { updateObject } from "../utility";

export interface BBReducerState {
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

const reducer = (
  state: BBReducerState = initialState,
  action: UnionActions
) => {
  switch (action.type) {
    case EnumActionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState);
    case EnumActionTypes.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedSt);
    case EnumActionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
      });
    case EnumActionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
      });
    default:
      return state;
  }
};

export default reducer;
