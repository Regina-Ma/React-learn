import {
  EnumActionTypes,
  UnionActions,
  PurchaseInitAction,
  PurchaseBurgerStartAction,
  PurchaseBurgerSuccessAction,
  PurchaseBurgerFailAction,
  FetchOrdersStartAction,
  FetchOrdersSuccessAction,
  FetchOrdersFailAction,
} from "../actions/actionTypes";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
import { updateObject } from "../utility";

interface OrderType {
  id: string;
  ingredients: Ingredient;
  price: number;
  orderData: { [element: string]: string };
}

export interface OrderReducerState {
  orders: OrderType[];
  loading: boolean;
  purchased: boolean;
}

const initialState = {
  orders: [] as OrderType[],
  loading: false,
  purchased: false,
};

const purchaseInit = (state: OrderReducerState, action: PurchaseInitAction) => {
  return updateObject(state, {
    purchased: false,
  });
};

const purchaseBurgerStart = (
  state: OrderReducerState,
  action: PurchaseBurgerStartAction
) => {
  return updateObject(state, {
    loading: true,
  });
};

const purchaseBurgerSuccess = (
  state: OrderReducerState,
  action: PurchaseBurgerSuccessAction
) => {
  // let newOrder = updateObject(action.orderData, {
  //   id: action.orderId,
  // });
  // return updateObject(state, {
  //   loading: false,
  //   purchased: true,
  //   orders: state.orders.concat(newOrder),
  // });
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
    purchased: true,
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
  };
};

const purchaseBurgerFail = (
  state: OrderReducerState,
  action: PurchaseBurgerFailAction
) => {
  return updateObject(state, {
    loading: false,
  });
};

const fetchOrderStart = (
  state: OrderReducerState,
  action: FetchOrdersStartAction
) => {
  return updateObject(state, {
    loading: false,
  });
};

const fetchOrdersSuccess = (
  state: OrderReducerState,
  action: FetchOrdersSuccessAction
) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const fetchOrdersFail = (
  state: OrderReducerState,
  action: FetchOrdersFailAction
) => {
  return updateObject(state, {
    loading: false,
  });
};

const reducer = (
  state: OrderReducerState = initialState,
  action: UnionActions
) => {
  switch (action.type) {
    case EnumActionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case EnumActionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case EnumActionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case EnumActionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case EnumActionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);
    case EnumActionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case EnumActionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
