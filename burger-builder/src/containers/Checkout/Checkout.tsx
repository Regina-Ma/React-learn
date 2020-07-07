import React, { Component } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Ingredient } from "../BurgerBuilder/BurgerBuilder";
import ContactData from "./ContactData/ContactData";
import { InitialState } from "../../store/reducers/burgerBuilder";

interface CheckoutProps extends RouteComponentProps {
  checkoutCancelled: History;
  checkoutContinued: History;
  ings: Ingredient;
}

class Checkout extends Component<CheckoutProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          //   component={ContactData} jei nereiketu perduoti duomenu
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: InitialState) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
