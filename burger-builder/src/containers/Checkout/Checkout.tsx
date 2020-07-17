import React, { Component } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Ingredient } from "../BurgerBuilder/BurgerBuilder";
import ContactData from "./ContactData/ContactData";
import { RootState } from "../../index";

interface CheckoutProps extends RouteComponentProps {
  checkoutCancelled: History;
  checkoutContinued: History;
  ings: Ingredient;
  purchased: boolean;
  onInitPurchase: () => void;
}

class Checkout extends Component<CheckoutProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : undefined;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     onInitPurchase: () =>
//       dispatch<actionTypes.PurchaseInitAction>(purchaseInit()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
export default connect(mapStateToProps)(Checkout);
