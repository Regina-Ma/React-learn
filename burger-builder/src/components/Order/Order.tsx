import React from "react";
import classes from "./Order.module.css";
import { Ingredient } from "../../containers/BurgerBuilder/BurgerBuilder";

interface OrderProps {
  key: string;
  price: string;
  ingredients: Ingredient;
}

const Order = (props: OrderProps) => {
  const ingredientArray = [];
  for (let ingredientName in props.ingredients) {
    ingredientArray.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredientArray.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
