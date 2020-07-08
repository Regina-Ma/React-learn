import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import { Ingredient } from "../../BurgerBuilder/BurgerBuilder";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import { RootState } from "../../../index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";

interface CDProps extends RouteComponentProps {
  ings: Ingredient;
  price: number;
  onOrderBurger: Function;
  loading: boolean;
}
export interface InputConfig {
  type: string;
  placeholder: string;
  options: Options[];
}

export interface Options {
  value: string;
  displayValue: string;
}
export interface OrderDataProps {
  ingredients: Ingredient;
  price: number;
  orderData: { [element: string]: string };
}

interface FormItemProps {
  elementType: string;
  elementConfig: InputConfig;
  value: string;
  validation: Validation;
  valid: boolean;
  touched: boolean;
  // [key: string]: string | SelectConfig | InputConfig;
}

interface Validation {
  required?: boolean;
  minLength?: number;
}

interface FormProps {
  name: FormItemProps;
  street: FormItemProps;
  zipCode: FormItemProps;
  country: FormItemProps;
  email: FormItemProps;
  deliveryMethod: FormItemProps;
  // [key: string]: FormItemProps;
}

interface CDState {
  orderForm: FormProps;
  formIsValid: boolean;
}

class ContactData extends Component<CDProps, CDState> {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
      } as FormItemProps,
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      } as FormItemProps,
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      } as FormItemProps,
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      } as FormItemProps,
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      } as FormItemProps,
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "cheapest",
        validation: {} as Validation,
        valid: true,
        touched: false,
      } as FormItemProps,
    },
    formIsValid: false,
    price: 0,
  };

  orderHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const names = {
      name: {} as FormItemProps,
      street: {} as FormItemProps,
      zipCode: {} as FormItemProps,
      email: {} as FormItemProps,
      country: {} as FormItemProps,
      deliveryMethod: {} as FormItemProps,
    };
    const formData: { [element: string]: string } = {};
    type Names = keyof typeof names;
    let key: Names;

    for (key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order: OrderDataProps = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
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
    inputIdentifier: string
  ) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormelement = {
      ...updatedOrderForm[inputIdentifier as keyof FormProps],
    };
    updatedFormelement.value = event.target.value;
    updatedFormelement.valid = this.checkValidity(
      updatedFormelement.value,
      updatedFormelement.validation
    );
    updatedFormelement.touched = true;
    updatedOrderForm[inputIdentifier as keyof FormProps] = updatedFormelement;
    let isValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isValid =
        updatedOrderForm[inputIdentifier as keyof FormProps].valid && isValid;
    }
    console.log(isValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: isValid });
  };

  render() {
    const formElementsArray = [];
    const names = {
      name: {} as FormItemProps,
      street: {} as FormItemProps,
      zipCode: {} as FormItemProps,
      email: {} as FormItemProps,
      country: {} as FormItemProps,
      deliveryMethod: {} as FormItemProps,
    };
    type Names = keyof typeof names;
    let key: Names;

    for (key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        configObject: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
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
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data: </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onOrderBurger: (orderData: OrderDataProps) =>
      dispatch({ type: purchaseBurger(orderData) }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
