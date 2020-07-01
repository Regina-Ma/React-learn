import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { AxiosInstance } from "axios";

interface WEHProps {
  children?: React.ReactNode;
  className?: string;
}

interface WEHState {
  error: string;
}

const withErrorHandler = (WrappedComponent: Function, axios: AxiosInstance) => {
  return class extends Component<WEHProps, WEHState> {
    reqInterceptor!: number;
    resInterceptor!: number;
    state = {
      error: "",
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: "" });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (er: Error) => {
          this.setState({ error: er.message });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: "" });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error !== "" ? true : false}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error === "" ? null : this.state.error}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
