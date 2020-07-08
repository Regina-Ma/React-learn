import { EnumActionTypes, UnionActions } from "../actions/actionTypes";
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

const reducer = (
  state: OrderReducerState = initialState,
  action: UnionActions
) => {
  switch (action.type) {
    case EnumActionTypes.PURCHASE_INIT:
      return updateObject(state, {
        purchased: false,
      });
    case EnumActionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true,
      });
    case EnumActionTypes.PURCHASE_BURGER_SUCCESS:
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
    case EnumActionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false,
      });
    case EnumActionTypes.FETCH_ORDERS_START:
      return updateObject(state, {
        loading: false,
      });
    case EnumActionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false,
      });

    case EnumActionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, {
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
