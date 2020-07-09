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
import { Dispatch } from "redux";
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

export const purchaseBurger = (orderData: OrderDataProps) => {
  return (dispatch: Dispatch) => {
    dispatch<PurchaseBurgerStartAction>(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch<PurchaseBurgerSuccessAction>(
          purchaseBurgerSuccess(response.data.name, orderData)
        );
      })
      .catch((error) => {
        dispatch<PurchaseBurgerFailAction>(purchaseBurgerFail(error));
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

export const fetchOrders = () => {
  return (dispatch: Dispatch) => {
    dispatch<FetchOrdersStartAction>(fetchOrdersStart());
    axios
      .get<OrderArray[]>("/orders.json")
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
