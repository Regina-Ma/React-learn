import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
import { OrderDataProps } from "../../containers/Checkout/ContactData/ContactData";
import { OrderArray } from "../../containers/Orders/Orders";

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

  AUTH_START = "AUTH_START",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_FAIL = "AUTH_FAIL",
}

// --------------------INGREDIENTS---------------------------

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

// --------------------PURCHASE---------------------------

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

// --------------------ORDERS---------------------------

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

// --------------------AUTHENTICATION---------------------------

export interface AuthStartAction {
  type: EnumActionTypes.AUTH_START;
}

export interface DataProps {
  email: string;
  password: string;
  returnSecureToken: boolean;
}
export interface AuthSuccessAction {
  type: EnumActionTypes.AUTH_SUCCESS;
  idToken: string;
  userId: string;
}

export interface AuthFailAction {
  type: EnumActionTypes.AUTH_FAIL;
  error: string;
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
  | FetchOrdersStartAction
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailAction;
