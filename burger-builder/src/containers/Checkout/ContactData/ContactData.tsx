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
  // [key: string]: string;
  type: string;
  placeholder: string;
}

export interface Options {
  value: string;
  displayValue: string;
}
export interface SelectConfig {
  // [key: string]: InputConfig[];
  options: Options[];
  // [key: string]: Array<InputConfig>;
}
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
  elementConfig: SelectConfig | InputConfig;
  value: string;
  // [key: string]: string | SelectConfig | InputConfig;
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
      } as FormItemProps,
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      } as FormItemProps,
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
      } as FormItemProps,
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      } as FormItemProps,
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
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
      } as FormItemProps,
    },
    ingredients: {} as Ingredient,
    loading: false,
    price: 0,
  };

  orderHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      <form action="">
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.configObject.elementType}
            elementConfig={formElement.configObject.elementConfig}
            value={formElement.configObject.value}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
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
