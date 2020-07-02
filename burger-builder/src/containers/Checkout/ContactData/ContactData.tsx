import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import { Ingredient } from "../../BurgerBuilder/BurgerBuilder";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

interface CDProps extends RouteComponentProps {
  ingredients: Ingredient;
  price: number;
}

interface CDState {
  name: string;
  email: string;
  address: {
    street: string;
    postCode: string;
  };
  loading: boolean;
}

class ContactData extends Component<CDProps, CDState> {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
    ingredients: {} as Ingredient,
    loading: false,
    price: 0,
  };

  orderHandler = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max",
        address: {
          street: "Gatve 1",
          zipCode: "95000",
          country: "Lithuania",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form action="">
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postCode" placeholder="Post Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data: </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
