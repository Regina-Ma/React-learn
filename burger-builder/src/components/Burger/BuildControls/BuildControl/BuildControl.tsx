import React from "react";
import classes from "./BuildControl.module.css";

interface BuildCtrlProps {
  label: string;
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: number | boolean;
}

const BuildControl = (props: BuildCtrlProps): JSX.Element => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled === true ? props.disabled : false}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default BuildControl;
