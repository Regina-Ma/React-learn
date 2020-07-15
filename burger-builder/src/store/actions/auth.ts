import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import {
  EnumActionTypes,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  LogoutAction,
  SetAuthRedirectPathAction,
  DataProps,
} from "./actionTypes";
import {} from "../reducers/auth";

import { RootState } from "../..";

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

export const logout = (): LogoutAction => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: EnumActionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (
  expirationTime: number
): ThunkAction<void, RootState, unknown, LogoutAction> => {
  return (dispatch: ThunkDispatch<RootState, unknown, LogoutAction>) => {
    setTimeout(() => {
      dispatch<LogoutAction>(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (
  path: string
): SetAuthRedirectPathAction => {
  return {
    type: EnumActionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};

export const auth = (
  email: string,
  password: string,
  isSignup: boolean
): ThunkAction<
  void,
  RootState,
  unknown,
  AuthStartAction | AuthSuccessAction | AuthFailAction
> => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      unknown,
      AuthStartAction | AuthSuccessAction | AuthFailAction
    >
  ) => {
    dispatch<AuthStartAction>(authStart());
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
        const expirationDate = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("userId", response.data.localId);
        dispatch<AuthSuccessAction>(
          authSuccess(response.data.idToken, response.data.localId)
        );
        dispatch(checkAuthTimeout(+response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch<AuthFailAction>(authFail(err.response.data.error.message));
      });
  };
};

export const authCheckState = (): ThunkAction<
  void,
  RootState,
  unknown,
  LogoutAction | AuthSuccessAction
> => {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch<LogoutAction>(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate")!);
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch<AuthSuccessAction>(authSuccess(token, userId!));
        dispatch<any>(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch<LogoutAction>(logout());
      }
    }
  };
};
