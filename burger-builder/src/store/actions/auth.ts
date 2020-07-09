import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  EnumActionTypes,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  DataProps,
} from "./actionTypes";
import {} from "../reducers/auth";

interface ResponseProps {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export const authStart = (): AuthStartAction => {
  return {
    type: EnumActionTypes.AUTH_START,
  };
};

export const authSuccess = (
  token: string,
  userId: string
): AuthSuccessAction => {
  return {
    type: EnumActionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error: string): AuthFailAction => {
  return {
    type: EnumActionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    const authData: DataProps = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAdwno8psVghb59ux325kgVfJquZMErW4";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAdwno8psVghb59ux325kgVfJquZMErW4";
    }
    axios
      .post<ResponseProps>(url, authData)
      .then((response: AxiosResponse<ResponseProps>) => {
        console.log(response);
        dispatch<AuthSuccessAction>(
          authSuccess(response.data.idToken, response.data.localId)
        );
      })
      .catch((err: Error) => {
        console.log(err);
        dispatch<AuthFailAction>(authFail(err.message));
      });
  };
};
