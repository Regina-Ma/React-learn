import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";
// export interface BurgerProps extends RouteComponentProps {
//   ingredients: { [key: string]: number };
// }

export interface BurgerProps {
  ingredients: Ingredient;
}

const Burger = (props: BurgerProps): JSX.Element => {
  console.log(props);
  let transformedIngredients: JSX.Element[];
  transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    })
    .reduce(
      (previous: JSX.Element[], current: JSX.Element[]): JSX.Element[] => {
        return previous.concat(current);
      },
      []
    );

  if (transformedIngredients.length === 0) {
    transformedIngredients = [
      <p key="zero">Please start adding ingredients</p>,
    ];
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
