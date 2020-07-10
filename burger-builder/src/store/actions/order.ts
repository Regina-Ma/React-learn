import { Dispatch } from "redux";
import {
  EnumActionTypes,
  PurchaseBurgerSuccessAction,
  PurchaseBurgerFailAction,
  PurchaseBurgerStartAction,
  PurchaseInitAction,
  FetchOrdersSuccessAction,
  FetchOrdersFailAction,
  FetchOrdersStartAction,
} from "./actionTypes";
import axios from "../../axios-orders";
import { OrderDataProps } from "../../containers/Checkout/ContactData/ContactData";
import { OrderArray } from "../../containers/Orders/Orders";

export const purchaseBurgerSuccess = (
  id: string,
  orderData: OrderDataProps
): PurchaseBurgerSuccessAction => {
  return {
    type: EnumActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error: string): PurchaseBurgerFailAction => {
  return {
    type: EnumActionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = (): PurchaseBurgerStartAction => {
  return {
    type: EnumActionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData: OrderDataProps, token: string) => {
  return (dispatch: Dispatch) => {
    dispatch<PurchaseBurgerStartAction>(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch<PurchaseBurgerSuccessAction>(
          purchaseBurgerSuccess(response.data.name, orderData)
        );
      })
      .catch((error: Error) => {
        dispatch<PurchaseBurgerFailAction>(purchaseBurgerFail(error.message));
      });
  };
};

export const purchaseInit = (): PurchaseInitAction => {
  return {
    type: EnumActionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (
  orders: OrderArray[]
): FetchOrdersSuccessAction => {
  return {
    type: EnumActionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error: string): FetchOrdersFailAction => {
  return {
    type: EnumActionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = (): FetchOrdersStartAction => {
  return {
    type: EnumActionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token: string, userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch<FetchOrdersStartAction>(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get<OrderArray[]>("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders: OrderArray[] = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch<FetchOrdersSuccessAction>(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err: Error) => {
        dispatch<FetchOrdersFailAction>(fetchOrdersFail(err.message));
      });
  };
};
