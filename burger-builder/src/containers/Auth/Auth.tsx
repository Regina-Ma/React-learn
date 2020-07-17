import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {
  FormItemProps,
  Validation,
} from "../../containers/Checkout/ContactData/ContactData";
import classes from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../store/actions/index";
import {
  SetAuthRedirectPathAction,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
} from "../../store/actions/actionTypes";
import Spinner from "../../components/UI/Spinner/Spinner";
import { RootState } from "../../index";

interface ControlProps {
  //   [key: string]: FormItemProps;
  email: FormItemProps;
  password: FormItemProps;
}

interface AuthState {
  controls: ControlProps;
  isSignup: boolean;
}

interface AuthProps {
  onAuth: (email: string, password: string, isSignup: boolean) => void;
  onSetRedirectPath: () => void;
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
  buildingBurger: boolean;
  authRedirectPath: string;
}

class Auth extends Component<AuthProps, AuthState> {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetRedirectPath();
    }
  }

  checkValidity(value: string, rules: Validation | undefined) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= 2 && isValid;
      }
    }
    return isValid;
  }

  inputChangedHandler = (
    event: React.ChangeEvent<HTMLFormElement>,
    controlName: string
  ) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName as keyof ControlProps],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName as keyof ControlProps].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState: AuthState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    const names = {
      email: {} as FormItemProps,
      password: {} as FormItemProps,
    };
    type Names = keyof typeof names;
    let key: Names;

    for (key in this.state.controls) {
      formElementsArray.push({
        id: key,
        configObject: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.configObject.elementType}
        elementConfig={formElement.configObject.elementConfig}
        value={formElement.configObject.value}
        invalid={!formElement.configObject.valid}
        shouldValidate={formElement.configObject.validation ? true : false}
        touched={formElement.configObject.touched}
        changed={(event: React.ChangeEvent<HTMLFormElement>) =>
          this.inputChangedHandler(event, formElement.id)
        }
      />
    ));

    if (this.props.loading) {
      form = [<Spinner key="zero" />];
    }

    let errorMessage: JSX.Element | undefined;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let authRedirect: JSX.Element | undefined;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Info" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== "",
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    unknown,
    | AuthStartAction
    | AuthSuccessAction
    | AuthFailAction
    | SetAuthRedirectPathAction
  >
) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(auth(email, password, isSignup)),
    onSetRedirectPath: () =>
      dispatch<SetAuthRedirectPathAction>(setAuthRedirectPath("/")),
  };
};

// export default Auth;
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
