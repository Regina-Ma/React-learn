import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {
  FormItemProps,
  Validation,
} from "../../containers/Checkout/ContactData/ContactData";
import classes from "./Auth.module.css";
import { auth } from "../../store/actions/index";

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
  onAuth: Function;
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

    const form = formElementsArray.map((formElement) => (
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
    return (
      <div className={classes.Auth}>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch<any>(auth(email, password, isSignup)),
  };
};

// export default Auth;
export default connect(null, mapDispatchToProps)(Auth);
