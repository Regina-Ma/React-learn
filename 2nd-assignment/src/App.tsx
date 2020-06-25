import React, { Component, ChangeEvent } from "react";
import "./App.css";
import Validation from "./Validation/Validation";
import Char from "./Char/Char";

interface AppProps {}

class App extends Component<AppProps> {
  state = {
    userInput: "",
  };

  inputChangedHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ userInput: event.target.value });
  };

  deleteCharHandler = (index: number): void => {
    const text = this.state.userInput.split("");
    text.splice(index, 1);
    const updatedText = text.join("");
    this.setState({ userInput: updatedText });
  };

  render() {
    const charList = this.state.userInput.split("").map((ch, index) => {
      return (
        <Char
          character={ch}
          key={index}
          clicked={() => this.deleteCharHandler(index)}
        />
      );
    });

    return (
      <div className="App">
        <input
          type="text"
          onChange={this.inputChangedHandler}
          value={this.state.userInput}
        />
        <p>{this.state.userInput}</p>
        <Validation inputLength={this.state.userInput.length} />
        {charList}
      </div>
    );
  }
}

export default App;
