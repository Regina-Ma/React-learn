import React, { Component } from "react";
import axios from "../../axios-orders";
import { Dispatch } from "redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredient } from "../BurgerBuilder/BurgerBuilder";
import { fetchOrders } from "../../store/actions/index";
import { connect } from "react-redux";
import { RootState } from "../..";
import Spinner from "../../components/UI/Spinner/Spinner";

export interface OrderArray {
  id: string;
  ingredients: Ingredient;
  price: string;
}

interface OrdersProps {
  onFetchOrders: Function;
  orders: OrderArray[];
  loading: boolean;
}

class Orders extends Component<OrdersProps> {
  componentDidMount() {
    this.props.onFetchOrders();
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFetchOrders: () => dispatch({ type: fetchOrders() }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
