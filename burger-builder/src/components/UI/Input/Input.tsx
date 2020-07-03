import React from "react";
import classes from "./Input.module.css";

interface InputConfig {
  type: string;
  placeholder: string;
}

interface Options {
  value: string;
  displayValue: string;
}
interface SelectConfig {
  options: Options[];
}
interface InputProps {
  //   label?: string;
  elementType: string;
  value: string;
  elementConfig: SelectConfig | InputConfig;
  //   type?: string;
  //   name?: string;
  //   placeholder?: string;
}
const Input = (props: InputProps) => {
  let inputElement: JSX.Element;

  function isSelect(input: SelectConfig | InputConfig): input is SelectConfig {
    return (input as SelectConfig).options !== undefined;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
    case "select":
      if (isSelect(props.elementConfig)) {
        inputElement = (
          <select className={classes.inputElement} value={props.value}>
            {props.elementConfig.options.map((option) => (
              <option value={option.value}>{option.displayValue}</option>
            ))}
          </select>
        );
      }
      break;
    default:
      inputElement = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label}</label> */}
      {inputElement ? inputElement : undefined}
    </div>
  );
};

export default Input;
