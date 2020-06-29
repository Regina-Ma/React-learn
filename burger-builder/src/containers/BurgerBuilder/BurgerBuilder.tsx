import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger, { BurgerProps } from "../../components/Burger/Burger";
import BuildControls, {
  Controls,
  Type,
} from "../../components/Burger/BuildControls/BuildControls";

interface BurgBuildProps {}

interface BurgBuildState extends Controls {
  ingredients: Array<Controls>;
}

class BurgerBuilder extends Component<BurgBuildProps, BurgBuildState> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };

  addIngredientHandler = (type: string) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
  };

  removeIngredientHandler = (type: Controls) => {};

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Aux>
    );
  }
}

export default BurgerBuilder;
