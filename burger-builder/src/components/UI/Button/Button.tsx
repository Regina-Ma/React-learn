import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  btnType: string;
}

const Button = (props: ButtonProps) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
