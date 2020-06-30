import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

interface LogoProps {
  height?: string;
}

const logo = (props: LogoProps) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="Burger-Builder" />
  </div>
);

export default logo;
