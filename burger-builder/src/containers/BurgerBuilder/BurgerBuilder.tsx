import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions/actionTypes";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath,
} from "../../store/actions/index";
import { RootState } from "../../index";

interface BurgBuildProps extends RouteComponentProps {
  ings: Ingredient;
  price: number;
  error: boolean;
  isAuthenticated: boolean;
  onIngredientAdded: () => void;
  onIngredientRemoved: () => void;
  onInitIngredients: () => void;
  onInitPurchase: () => void;
  onSetRedirectPath: (path: string) => void;
}

export interface Ingredient {
  [key: string]: number;
}
interface BurgBuildState {
  purchasable?: boolean;
  purchasing: boolean;
}

class BurgerBuilder extends Component<BurgBuildProps, BurgBuildState> {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log("BurgerBuilder", this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients: Ingredient) {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = (): void => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = (): void => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (): void => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo: { [key: string]: number | boolean } = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <>
        <p>Ingredients can't be loaded</p>
      </>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            isAuth={this.props.isAuthenticated}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== "",
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    unknown,
    | actionTypes.AddIngredientAction
    | actionTypes.RemoveIngredientAction
    | actionTypes.PurchaseInitAction
    | actionTypes.SetAuthRedirectPathAction
  >
) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch<actionTypes.AddIngredientAction>(addIngredient(ingName)),
    onIngredientRemoved: (ingName: string) =>
      dispatch<actionTypes.RemoveIngredientAction>(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () =>
      dispatch<actionTypes.PurchaseInitAction>(purchaseInit()),
    onSetRedirectPath: (path: string) =>
      dispatch<actionTypes.SetAuthRedirectPathAction>(
        setAuthRedirectPath(path)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
