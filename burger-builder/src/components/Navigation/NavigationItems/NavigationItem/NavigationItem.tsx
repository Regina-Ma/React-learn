import React from "react";
import classes from "./NavigationItem.module.css";

interface NavigationIProps {
  children: string;
  link: string;
  active?: boolean;
}

const NavigationItem = (props: NavigationIProps) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : undefined}>
      {props.children}
    </a>
  </li>
);

export default NavigationItem;
