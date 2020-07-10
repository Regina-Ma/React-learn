import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import { Dispatch } from "redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/index";
import { RootState } from "./index";

interface AppProps extends RouteComponentProps {
  onTryAutoSignup: Function;
  isAuthenticated: boolean;
}
class App extends Component<AppProps> {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.token !== "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTryAutoSignup: () => dispatch<any>(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
