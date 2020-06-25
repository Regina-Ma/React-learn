import React from "react";

interface ValidationProps {
  inputLength: number;
}

const validation = (props: ValidationProps): JSX.Element => {
  let validationMessage = "Text long enough";

  if (props.inputLength <= 5) {
    validationMessage = "Text too short!";
  }
  return (
    <div>
      <p>{validationMessage}</p>
    </div>
  );
};

export default validation;
