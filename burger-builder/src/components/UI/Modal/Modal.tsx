import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  modalClosed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ModalState {}

class Modal extends Component<ModalProps, ModalState> {
  shouldComponentUpdate(nextProps: ModalProps, nextState: ModalState) {
    return nextProps.show !== this.props.show;
  }

  // componentWillUpdate() {
  //   console.log("[Modal] WillUpdate");
  // }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children};
        </div>
      </Aux>
    );
  }
}

export default Modal;
