import React, { ChangeEventHandler } from "react";
import classes from "./Input.module.css";

interface InputConfig {
  type: string;
  placeholder: string;
  options: Options[];
}

interface Options {
  value: string;
  displayValue: string;
}
// interface SelectConfig {
//   options: Options[];
// }
interface InputProps {
  elementType: string;
  value: string;
  elementConfig: InputConfig;
  changed: React.ChangeEventHandler;
  invalid: boolean;
  shouldValidate: boolean;
  touched: boolean;
}
const Input = (props: InputProps) => {
  let inputElement: JSX.Element;

  const inputClasses = [classes.inputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      //   if (isSelect(props.elementConfig)) {
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      //   }
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label}</label> */}
      {inputElement}
    </div>
  );
};

export default Input;
