import React, { MouseEvent } from "react";
import "./Char.css";

interface CharProps {
  character: string;
  key: number;
  clicked?: (event: MouseEvent<HTMLInputElement>) => void;
}

const char = (props: CharProps): JSX.Element => {
  return (
    <div className="Char" onClick={props.clicked}>
      {props.character}
    </div>
  );
};

export default char;
