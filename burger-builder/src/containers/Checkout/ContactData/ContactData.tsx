import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import { Ingredient } from "../../BurgerBuilder/BurgerBuilder";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

interface CDProps extends RouteComponentProps {
  ingredients: Ingredient;
  price: number;
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
// export interface SelectConfig {
// [key: string]: InputConfig[];
// options: Options[];
// [key: string]: Array<InputConfig>;
// }

// interface FormInputProps {
//   elementType: string;
//   elementConfig: InputConfig;
//   value: string;
// }

// interface FormSelectProps {
//   elementType: string;
//   elementConfig: SelectConfig;
//   value: string;
// }

interface FormItemProps {
  elementType: string;
  elementConfig: InputConfig;
  value: string;
  validation?: Validation;
  valid: boolean;
  // [key: string]: string | SelectConfig | InputConfig;
}

interface Validation {
  required: boolean;
  minLength: number;
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
  loading: boolean;
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
      } as FormItemProps,
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        valid: false,
      } as FormItemProps,
    },
    ingredients: {} as Ingredient,
    loading: false,
    price: 0,
  };

  orderHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });

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

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value: string, rules: Validation | undefined) {
    let isValid = true;
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
    updatedOrderForm[inputIdentifier as keyof FormProps] = updatedFormelement;
    console.log(updatedFormelement);
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    // let key: Extract<keyof FormItemProps, string>;
    // declare let _foo: Foo;
    // let bar: typeof _foo.foo;

    // declare key _[key]: FormItemProps;

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
            changed={(event: React.ChangeEvent<HTMLFormElement>) =>
              this.inputChangedHandler(event, formElement.id)
            }
          />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
