import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
import { OrderDataProps } from "../../containers/Checkout/ContactData/ContactData";
import { OrderArray } from "../../containers/Orders/Orders";

// export const ADD_INGREDIENT = "ADD_INGREDIENT";
// export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
// export const SET_INGREDIENTS = "SET_INGREDIENTS";
// export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export enum EnumActionTypes {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,

  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,

  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
}

export interface AddIngredientAction {
  type: EnumActionTypes.ADD_INGREDIENT;
  // payload: Ingredient;
  ingredientName: keyof Ingredient;
}

export interface RemoveIngredientAction {
  type: EnumActionTypes.REMOVE_INGREDIENT;
  // ingredientType: string;
  ingredientName: keyof Ingredient;
}

export interface SetIngredientsAction {
  type: EnumActionTypes.SET_INGREDIENTS;
  ingredients: Ingredient;
}

export interface FetchIngredientsFailedAction {
  type: EnumActionTypes.FETCH_INGREDIENTS_FAILED;
  error: boolean;
}

export interface PurchaseBurgerSuccessAction {
  type: EnumActionTypes.PURCHASE_BURGER_SUCCESS;
  orderId: string;
  orderData: OrderDataProps;
}

export interface PurchaseBurgerFailAction {
  type: EnumActionTypes.PURCHASE_BURGER_FAIL;
  error: string;
}

export interface PurchaseBurgerStartAction {
  type: EnumActionTypes.PURCHASE_BURGER_START;
}

export interface PurchaseInitAction {
  type: EnumActionTypes.PURCHASE_INIT;
}

export interface FetchOrdersSuccessAction {
  type: EnumActionTypes.FETCH_ORDERS_SUCCESS;
  orders: OrderArray[];
}

export interface FetchOrdersFailAction {
  type: EnumActionTypes.FETCH_ORDERS_FAIL;
  error: string;
}

export interface FetchOrdersStartAction {
  type: EnumActionTypes.FETCH_ORDERS_START;
}

export type UnionActions =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetIngredientsAction
  | FetchIngredientsFailedAction
  | PurchaseBurgerSuccessAction
  | PurchaseBurgerFailAction
  | PurchaseBurgerStartAction
  | PurchaseInitAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailAction
  | FetchOrdersStartAction;
