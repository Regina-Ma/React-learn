import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

interface OrdersState {
  orders: [];
  loading: boolean;
}

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
