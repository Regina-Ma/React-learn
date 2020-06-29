import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = (props: LayoutProps) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
