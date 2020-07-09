import {
  EnumActionTypes,
  UnionActions,
  AddIngredientAction,
  RemoveIngredientAction,
  SetIngredientsAction,
  FetchIngredientsFailedAction,
} from "../actions/actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
import { updateObject } from "../utility";

export interface BBReducerState {
  ingredients: Ingredient;
  totalPrice: number;
  error: boolean;
}

const initialState = {
  ingredients: {
    // salad: 0,
    // cheese: 0,
    // meat: 0,
    // bacon: 0,
  } as Ingredient,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES: Ingredient = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state: BBReducerState, action: AddIngredientAction) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (
  state: BBReducerState,
  action: RemoveIngredientAction
) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (
  state: BBReducerState,
  action: SetIngredientsAction
) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
  });
};

const fetchIngredientsFailed = (
  state: BBReducerState,
  action: FetchIngredientsFailedAction
) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (
  state: BBReducerState = initialState,
  action: UnionActions
) => {
  switch (action.type) {
    case EnumActionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    // return {
    //   ...state,
    //   ingredients: {
    //     ...state.ingredients,
    //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    //   },
    //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    // };

    case EnumActionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case EnumActionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case EnumActionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
