import {
  EnumActionTypes,
  UnionActions,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  LogoutAction,
  SetAuthRedirectPathAction,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

export interface AuthReducerState {
  token?: string;
  userId: string;
  error?: string;
  loading: boolean;
  authRedirectPath: string;
}

const initialState = {
  token: "",
  userId: "",
  error: "",
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state: AuthReducerState, action: AuthStartAction) => {
  return updateObject(state, { error: "", loading: true });
};

const authSuccess = (state: AuthReducerState, action: AuthSuccessAction) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: "",
    loading: false,
  });
};

const authFail = (state: AuthReducerState, action: AuthFailAction) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: AuthReducerState, action: LogoutAction) => {
  return updateObject(state, {
    token: "",
    userId: "",
  });
};

const setAuthRedirectPath = (
  state: AuthReducerState,
  action: SetAuthRedirectPathAction
) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
};

const reducer = (
  state: AuthReducerState = initialState,
  action: UnionActions
) => {
  switch (action.type) {
    case EnumActionTypes.AUTH_START:
      return authStart(state, action);
    case EnumActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case EnumActionTypes.AUTH_FAIL:
      return authFail(state, action);
    case EnumActionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case EnumActionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
