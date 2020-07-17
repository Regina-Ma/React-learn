import React, { Component } from "react";
import axios from "../../axios-orders";
import { ThunkDispatch } from "redux-thunk";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredient } from "../BurgerBuilder/BurgerBuilder";
import { fetchOrders } from "../../store/actions/index";
import {
  FetchOrdersSuccessAction,
  FetchOrdersFailAction,
} from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import { RootState } from "../..";
import Spinner from "../../components/UI/Spinner/Spinner";

export interface OrderArray {
  id: string;
  ingredients: Ingredient;
  price: string;
}

interface OrdersProps {
  onFetchOrders: (token: string, userId: string) => void;
  orders: OrderArray[];
  loading: boolean;
  token: string;
  userId: string;
}

class Orders extends Component<OrdersProps> {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = [<Spinner />];
    if (!this.props.loading) {
      orders = this.props.orders.map<JSX.Element>(
        (order: OrderArray): JSX.Element => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        )
      );
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    unknown,
    FetchOrdersSuccessAction | FetchOrdersFailAction
  >
) => {
  return {
    onFetchOrders: (token: string, userId: string) =>
      dispatch(fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
