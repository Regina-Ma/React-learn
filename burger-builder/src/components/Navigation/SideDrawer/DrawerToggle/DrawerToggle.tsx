import React from "react";
import classes from "./DrawerToggle.module.css";

interface DrawTogProps {
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DrawerToggle = (props: DrawTogProps) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerToggle;
