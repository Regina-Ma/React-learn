import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredient } from "../BurgerBuilder/BurgerBuilder";

interface OrderArray {
  id: string;
  ingredients: Ingredient;
  price: string;
}
interface OrdersState extends OrderArray {
  orders: OrderArray[];
  loading: boolean;
}

class Orders extends Component<OrdersState> {
  state = {
    orders: [] as OrderArray[],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders: OrderArray[] = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order: OrderArray) => {
          console.log(order);
          //   return (<Order
          //     key={order.id}
          //     ingredients={order.ingredients}
          //     price={order.price}
          //   />);
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
