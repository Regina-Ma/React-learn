import React from "react";
import Burger from "../../Burger//Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import { Ingredient } from "../../../containers/BurgerBuilder/BurgerBuilder";

interface CSProps {
  ingredients: Ingredient;
  checkoutCancelled: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  checkoutContinued: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const CheckoutSummary = (props: CSProps) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Bon apetit!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
