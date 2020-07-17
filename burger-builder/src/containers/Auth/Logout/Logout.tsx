import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";

import { logout } from "../../../store/actions/index";
import { LogoutAction } from "../../../store/actions/actionTypes";
import { connect } from "react-redux";

interface LogoutProps {
  onLogout: () => void;
}

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => dispatch<LogoutAction>(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
