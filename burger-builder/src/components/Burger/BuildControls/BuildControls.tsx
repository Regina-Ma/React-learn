import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

export interface Type {
  type: string;
}
export interface Controls extends Type {
  label: string;
}

interface Controls: {
  [key: string]: string,
 }[]

export interface BuildCtrlsProps extends Controls {
  controls: Array<Controls>;
}

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = () => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl key={ctrl.label} label={ctrl.label} />
    ))}
  </div>
);

export default BuildControls;
